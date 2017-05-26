const getEnergy = creep => {

    var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: struct => struct.structureType == STRUCTURE_CONTAINER && !struct.pos.inRangeTo(struct.room.controller, 4) || struct.structureType == STRUCTURE_STORAGE});
    if (droppedEnergy) {
        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else if (container) {
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

const getStructuresByTypes = (room, types) =>
    room.find(FIND_MY_STRUCTURES, {
        filter: structure =>
        (structure.energy != undefined ? structure.energy < structure.energyCapacity : structure.store && _.sum(structure.store) < structure.storeCapacity) && types.some(type => type == structure.structureType)
    });

const getCreepsByRoles = (room, roles) =>
    room.find(FIND_MY_CREEPS, {
        filter: creep =>
        creep.carry.energy < creep.carryCapacity && roles.some(role => role == creep.memory.role) && !creep.spawning
    });


const transferToClosest = (creep, targets) => {
    if (targets.length > 0) {
        const target = creep.pos.findClosestByPath(targets);
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}}) == ERR_NO_PATH) {
                return false;
            }
        }
        return true;
    }
    return false;
}


module.exports = {

    name: 'mover',

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy == 0 || creep.carry.energy < creep.carryCapacity && (creep.pos.findInRange(FIND_DROPPED_ENERGY, 1).length > 0 || creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: struct => struct.structureType == STRUCTURE_CONTAINER && !struct.pos.inRangeTo(struct.room.controller, 4)}).length > 0)) {
            getEnergy(creep);
        }
        else {
            transferToClosest(creep, getStructuresByTypes(creep.room, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]))
            || transferToClosest(creep, getStructuresByTypes(creep.room, [STRUCTURE_TOWER]))
            || transferToClosest(creep, getCreepsByRoles(creep.room, ['builder']))
            || transferToClosest(creep, getStructuresByTypes(creep.room, [STRUCTURE_STORAGE]))
            || creep.carry.energy < creep.carryCapacity && getEnergy(creep);
        }
    }
};