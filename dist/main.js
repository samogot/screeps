const maintainPopulation = require('maintainPopulation');
const strctureTower = require('structure.tower');
const roles = [
    require('role.harvester'),
    require('role.upgrader'),
    require('role.builder'),
    require('role.mover'),
];
require('extendPrototypes');

module.exports.loop = function () {

    for (let structure of _.values(Game.structures)) {
        if (structure.structureType === STRUCTURE_TOWER) {
            strctureTower.run(structure);
        }
    }

    maintainPopulation(Game.spawns['Spawn1']);

    for (let creep of _.values(Game.creeps)) {
        for (let role of roles) {
            if (!creep.spawning && creep.memory.role === role.name) {
                role.run(creep);
            }
        }
    }
};