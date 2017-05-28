const getEnergy = creep => {

    const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: struct => struct.structureType === STRUCTURE_CONTAINER && !struct.pos.inRangeTo(struct.room.controller, 4) && struct.store.energy > 0});
    const storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: struct => struct.structureType === STRUCTURE_STORAGE && struct.store.energy > 0});
    if (droppedEnergy) {
        if (creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    if (container && (!droppedEnergy || creep.pos.isNearTo(container) && (droppedEnergy.amount <= HARVEST_POWER * 5 || !creep.pos.isNearTo(droppedEnergy) ))) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    if (!container && !droppedEnergy && storage) {
        if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

const getStructuresByTypes = (room, types) =>
    room.find(FIND_MY_STRUCTURES, {
        filter: structure =>
        (structure.energy !== undefined ? structure.energy < structure.energyCapacity : structure.store && _.sum(structure.store) < structure.storeCapacity) && types.some(type => type == structure.structureType)
    });

const getCreepsByRoles = (room, roles) =>
    room.find(FIND_MY_CREEPS, {
        filter: creep =>
        creep.carry.energy < creep.carryCapacity && roles.some(role => role === creep.memory.role) && !creep.spawning
    });


const transferToClosest = (creep, targets) => {
    if (targets.length > 0) {
        const target = creep.pos.findClosestByPath(targets);
        if (target && target.structureType === STRUCTURE_STORAGE && creep.pos.isNearTo(target)) {
            for (let resourceType of _.keys(creep.carry)) {
                if (resourceType !== RESOURCE_ENERGY && creep.transfer(target, resourceType) === OK) {
                    return true;
                }
            }
        }
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            if (creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}}) === ERR_NO_PATH) {
                return false;
            }
        }
        return true;
    }
    return false;
};


module.exports = {

    name: 'mover',

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy === 0 || _.sum(creep.carry) < creep.carryCapacity && (creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1).length > 0 || creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: struct => struct.structureType === STRUCTURE_CONTAINER && !struct.pos.inRangeTo(struct.room.controller, 4)}).length > 0)) {
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