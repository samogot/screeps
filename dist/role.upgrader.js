module.exports = {

    name: 'upgrader',

    /** @param {Creep} creep **/
    run: function (creep) {
        let container;
        if (creep.room.controller.memory.container) {
            container = Game.getObjectById(creep.room.controller.memory.container);
        } else {
            container = creep.room.controller.pos.findInRange(FIND_STRUCTURES, 4, {filter: struct => struct.structureType === STRUCTURE_CONTAINER})[0];
            creep.room.controller.memory.container = container.id;
        }


        const hasContainerEnergySource = position => position.isNearTo(container);
        const hasAnyEnergySource = position => hasContainerEnergySource(position) || position.findInRange(FIND_MY_CREEPS, 1, {filter: creep => creep.memory.role === 'upgrader' && hasContainerEnergySource(creep.pos)}).length > 0;

        if (!creep.memory.hasOwnProperty('moving') || !creep.memory.moving && !hasAnyEnergySource(creep.pos)) {
            creep.memory.moving = true;
            creep.say('\uD83D\uDD04 move');
        }

        if (creep.memory.moving && creep.memory.targetPos && creep.pos.isEqualTo(creep.memory.targetPos.x, creep.memory.targetPos.y)) {
            creep.memory.moving = false;
            creep.say('\u26A1\uFE0F upgrade');
        }

        if (creep.memory.moving) {
            let targetPos;
            if (creep.memory.targetPos) {
                targetPos = new RoomPosition(creep.memory.targetPos.x, creep.memory.targetPos.y, creep.memory.targetPos.roomName);
                if ((targetPos.isObstacle && !targetPos.isEqualTo(creep)) || !hasAnyEnergySource(targetPos)) {
                    targetPos = null;
                }
            }
            if (!targetPos) {
                const positionCandidates = [];
                for (let i = -3; i <= 3; ++i) {
                    for (let j = -3; j <= 3; ++j) {
                        const position = creep.room.getPositionAt(creep.room.controller.pos.x + i, creep.room.controller.pos.y + j);
                        if ((!position.isObstacle || position.isEqualTo(creep)) && hasAnyEnergySource(position)) {
                            positionCandidates.push(position);
                        }
                    }
                }
                const directPositions = positionCandidates.filter(hasContainerEnergySource);
                if (directPositions.length > 0) {
                    targetPos = creep.room.controller.pos.findClosestByRange(directPositions);
                }
                else {
                    targetPos = container.pos.findClosestByRange(positionCandidates);
                }

                if (targetPos) {
                    creep.memory.targetPos = targetPos;
                }
                else {
                    console.log(creep.name + ' can\'t find target position');
                    creep.say('\u26A0\uFE0F no target');
                }
            }
            if (targetPos) {
                creep.moveTo(targetPos, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if (Game.time % 100 === 0 && !hasContainerEnergySource(creep.pos)) {
                creep.memory.moving = undefined;
                creep.memory.targetPos = undefined;
            }
        }

        if (creep.carry.energy > 0) {
            creep.upgradeController(creep.room.controller)
        }
        else {
            const droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1, res => res.resourceType === RESOURCE_ENERGY && res.amount > HARVEST_POWER * 5);
            const containers = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: struct => struct.structureType === STRUCTURE_CONTAINER});
            const otherUpgraders = creep.pos.findInRange(FIND_MY_CREEPS, 1, {filter: creep => creep.memory.role === 'upgrader' && creep.carry.energy > 0 && hasContainerEnergySource(creep.pos)});
            if (droppedResources[0]) {
                creep.pickup(droppedResources[0]);
            }
            else if (containers[0]) {
                creep.withdraw(containers[0], RESOURCE_ENERGY);
            }
            else if (otherUpgraders.length > 0) {
                _.max(otherUpgraders, creep => creep.carry.energy).transfer(creep, RESOURCE_ENERGY);
            }
        }
    }
};