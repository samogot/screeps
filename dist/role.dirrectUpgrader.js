const isObstacle = position => {
    const looks = position.look();
    return looks.some(look => (look.type == LOOK_TERRAIN && look[LOOK_TERRAIN] == 'wall') || look.type == LOOK_CREEPS
    || (look.type == LOOK_STRUCTURES && OBSTACLE_OBJECT_TYPES.includes(look[LOOK_STRUCTURES].structureType)))
}


var roleDirrectUpgrader = {

    name: 'dirrectUpgrader',

    /** @param {Creep} creep **/
    run: function (creep) {
        var isStaticHarvester = harvester => harvester.memory.role == 'harvester' && harvester.pos.inRangeTo(harvester.room.controller, 4);
        var canTransfer = creep => creep.memory.role == 'harvester' || (creep.memory.role == 'dirrectUpgrader' && creep.pos.findInRange(FIND_CREEPS, 1, {filter: isStaticHarvester}).length > 0);

        if (!creep.pos.inRangeTo(creep.room.controller, 3)
            || (creep.carry.energy == 0 && creep.pos.findInRange(FIND_CREEPS, 1, {filter: canTransfer}).length == 0)) {
            var positions = [];
            for (var i = -3; i <= 3; ++i) {
                for (var j = -3; j <= 3; ++j) {
                    var position = new RoomPosition(creep.room.controller.pos.x + i, creep.room.controller.pos.y + j, creep.room.controller.pos.roomName);
                    if (position.findInRange(FIND_CREEPS, 1, {filter: canTransfer}).length > 0 && !isObstacle(position)) {
                        positions.push(position);
                    }
                }
            }
            var position = null;
            var dirrectPositions = positions.filter(pos => pos.findInRange(FIND_CREEPS, 1, {filter: isStaticHarvester}).length > 0)
            if (dirrectPositions.length > 0)
                position = creep.room.controller.pos.findClosestByRange(dirrectPositions)
            else
                position = creep.pos.findClosestByRange(positions);

            if (position)
                creep.moveTo(position, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        else {
            if (creep.carry.energy != 0) {
                var otherUpgrader = creep.pos.findInRange(FIND_CREEPS, 1, {
                    filter: creep => creep.carry.energy == 0 && creep.memory.role == 'dirrectUpgrader' && !creep.pos.isNearTo(creep.pos.findInRange(FIND_CREEPS, 1, {filter: isStaticHarvester})[0])
                });
                if (otherUpgrader.length > 0) {
                    creep.transfer(otherUpgrader[0], RESOURCE_ENERGY);
                }
                creep.upgradeController(creep.room.controller)
            }
            else {
                var droppedResources = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
                if (droppedResources[0]) {
                    creep.pickup(droppedResources[0]);
                }
                else {
                    var container = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: struct => struct.structureType == STRUCTURE_CONTAINER});
                    if (container[0])
                        creep.withdraw(container[0], RESOURCE_ENERGY);
                }
            }
        }
    }
};

module.exports = roleDirrectUpgrader;