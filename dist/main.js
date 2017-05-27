const maintainPopulation = require('maintainPopulation');
const roles = [
    require('role.harvester'),
    require('role.upgrader'),
    require('role.builder'),
    require('role.mover'),
];


module.exports.loop = function () {

    for (let structure of _.values(Game.structures)) {
        if (structure.structureType === STRUCTURE_TOWER) {
            const closestHostileHealer = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: creep => creep.getActiveBodyparts(HEAL) > 0});
            const closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            const closestDamagedCreep = structure.pos.findClosestByRange(FIND_MY_CREEPS, {filter: creep => creep.hits < creep.hitsMax});
            const closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART
            });
            if (closestHostileHealer) {
                structure.attack(closestHostileHealer);
            }
            else if (closestHostile) {
                structure.attack(closestHostile);
            }
            else if (closestDamagedStructure) {
                structure.repair(closestDamagedStructure);
            }
            else if (closestDamagedCreep) {
                structure.heal(closestDamagedCreep);
            }
        }
    }

    const capacity = Game.rooms['W31S91'].energyCapacityAvailable;
    const rules = {
        mover: {
            count: 1,
            body: [...new Array(Math.floor(capacity / 100)).fill(CARRY), ...new Array(Math.floor(capacity / 100)).fill(MOVE)]
        },
        harvester: {
            count: 2,
            body: [...new Array(Math.min(Math.floor((capacity - 50) / 100), 5)).fill(WORK), MOVE]
        },
        upgrader: {
            count: 2,
            body: [...new Array(Math.min(Math.floor((capacity - 100) / 100), 7)).fill(WORK), CARRY, MOVE]
        },
        builder: {
            count: 1,
            body: [...new Array(Math.floor((capacity - 200) / 100)).fill(WORK), CARRY, CARRY, MOVE, MOVE]
        },
    };

    maintainPopulation(rules);

    for (let creep of _.values(Game.creeps)) {
        for (let role of roles) {
            if (!creep.spawning && creep.memory.role === role.name) {
                role.run(creep);
            }
        }
    }
};