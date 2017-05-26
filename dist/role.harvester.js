var roleHarvester = {

    name: 'harvester',

    /** @param {Creep} creep **/
    run: function (creep) {
        if (!creep.memory.source) {
            var sources = creep.room.find(FIND_SOURCES);
            var source = creep.pos.findClosestByPath(sources);
            if (source) {
                if (creep.pos.isNearTo(source)) {
                    creep.memory.source = source.id;
                }
                else {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        if (creep.memory.source) {
            if (creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                creep.memory.source = null;
                console.log(creep, ' unexpected lost his source');
            }
        }
    }
};

module.exports = roleHarvester;