var maintainPopulation = require('maintainPopulation');
var roles = [
    require('role.harvester'),
    require('role.dirrectUpgrader'),
    require('role.builder'),
    require('role.mover'),
];


module.exports.loop = function () {

    for (let structure of _.values(Game.structures)) {
        if (structure.structureType === STRUCTURE_TOWER) {
            var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }

            var closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax / 2 && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
            });
            if (closestDamagedStructure) {
                structure.repair(closestDamagedStructure);
            }
        }
    }

    var capacity = Game.rooms['W31S91'].energyCapacityAvailable;
    var rules = {
        harvester: {
            count: 2,
            body: [...Array(Math.min(Math.floor((capacity - 50) / 100), 5)).fill(WORK), MOVE]
        },
        mover: {
            count: 1,
            body: [...Array(Math.floor(capacity / 100)).fill(CARRY), ...Array(Math.floor(capacity / 100)).fill(MOVE)]
        },
        dirrectUpgrader: {
            count: 2,
            body: [...Array(Math.min(Math.floor((capacity - 100) / 100), 7)).fill(WORK), CARRY, MOVE]
        },
        builder: {
            count: 1,
            body: [...Array(Math.floor((capacity - 150) / 100)).fill(WORK), CARRY, CARRY, MOVE]
        },
    };

    maintainPopulation(rules);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        for (let role of roles) {
            if (creep.memory.role == role.name) {
                role.run(creep);
            }
        }
    }
}