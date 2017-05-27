/**
 * @param {RoomPosition} position
 * @returns {boolean}
 */
const isObstacle = position => {
    const looks = position.look();
    return looks.some(look =>
        look.type === LOOK_CREEPS
        || (look.type === LOOK_STRUCTURES && OBSTACLE_OBJECT_TYPES.includes(look[LOOK_STRUCTURES].structureType))
        || (look.type === LOOK_TERRAIN && look[LOOK_TERRAIN] === 'wall')
    )
};


module.exports = {

    name: 'upgrader',

    /** @param {Creep} creep **/
    run: function (creep) {
        const hasContainerEnergySource = position => position.findInRange(FIND_STRUCTURES, 1, {filter: struct => struct.structureType === STRUCTURE_CONTAINER}).length > 0;
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
                if (isObstacle(targetPos) || !hasAnyEnergySource(targetPos)) {
                    targetPos = null;
                }
            }
            if (!targetPos) {
                const positionCandidates = [];
                for (let i = -3; i <= 3; ++i) {
                    for (let j = -3; j <= 3; ++j) {
                        const position = creep.room.getPositionAt(creep.room.controller.pos.x + i, creep.room.controller.pos.y + j);
                        if (!isObstacle(position) && hasAnyEnergySource(position)) {
                            positionCandidates.push(position);
                        }
                    }
                }
                const directPositions = positionCandidates.filter(hasContainerEnergySource);
                if (directPositions.length > 0) {
                    targetPos = creep.room.controller.pos.findClosestByRange(directPositions);
                }
                else {
                    targetPos = creep.pos.findClosestByRange(positionCandidates);
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
            else if (otherUpgraders[0]) {
                otherUpgraders[0].transfer(creep, RESOURCE_ENERGY, otherUpgraders[0].carry.energy / 2);
            }
        }
    }
};