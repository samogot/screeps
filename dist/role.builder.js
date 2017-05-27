const getConstructionSites = (room, filter) =>
    room.find(FIND_CONSTRUCTION_SITES, {filter});

const getStructures = (room, filter) =>
    room.find(FIND_STRUCTURES, {filter});


const buildFirst = (creep, targets) => {
    if (targets.length > 0) {
        if (creep.build(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            if (creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}) === ERR_NO_PATH) {
                return false;
            }
        }
        return true;
    }
    return false;
};

const buildClosest = (creep, targets) => {
    if (targets.length > 0) {
        const target = creep.pos.findClosestByPath(targets);
        if (creep.build(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            if (creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}}) === ERR_NO_PATH) {
                return false;
            }
        }
        return true;
    }
    return false;
};

const repairClosest = (creep, targets) => {
    if (targets.length > 0) {
        const target = creep.pos.findClosestByPath(targets);
        if (creep.repair(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            if (creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}}) === ERR_NO_PATH) {
                return false;
            }
        }
        return true;
    }
    return false;
};

const repairWorst = (creep, targets) => {
    if (targets.length > 0) {
        const target = targets.reduce((p, v) => p.hits < v.hits ? p : v);
        if (creep.repair(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            if (creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}}) === ERR_NO_PATH) {
                return false;
            }
        }
        return true;
    }
    return false;
};


module.exports = {

    name: 'builder',

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy === 0) {
            creep.moveTo(new RoomPosition(33, 5, creep.pos.roomName));
            //creep.moveTo(new RoomPosition(40,14,creep.pos.roomName));
        }
        repairClosest(creep, getStructures(creep.room, struct => struct.structureType !== STRUCTURE_WALL && struct.structureType !== STRUCTURE_RAMPART && struct.hits < struct.hitsMax / 2))
        || buildFirst(creep, getConstructionSites(creep.room))
        || buildClosest(creep, getConstructionSites(creep.room))
        || repairClosest(creep, getStructures(creep.room, struct => struct.structureType !== STRUCTURE_WALL && struct.structureType !== STRUCTURE_RAMPART && struct.hits < struct.hitsMax))
        || repairWorst(creep, getStructures(creep.room, struct => struct.hits < struct.hitsMax))
    }
};