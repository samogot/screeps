function deleteUnusedMemory() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

/** @param {StructureSpawn} spawn */
module.exports = function (spawn) {
    const counts = {};
    const getCount = role => counts[role] || 0;
    for (let creep of _.values(Game.creeps)) {
        if (creep.spawning || creep.ticksToLive > CREEP_SPAWN_TIME * creep.body.length) {
            counts[creep.memory.role] = getCount(creep.memory.role) + 1;
        }
    }

    const capacity = !counts.mover ? Math.max(spawn.room.energyAvailable, SPAWN_ENERGY_START) : spawn.room.energyCapacityAvailable;
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

    for (let role of _.keys(rules)) {
        if (getCount(role) < rules[role].count && spawn.canCreateCreep(rules[role].body) === OK) {
            deleteUnusedMemory();
            const namePrefix = capitalizeFirstLetter(role);
            let newName;
            do {
                newName = namePrefix + (Math.floor(Math.random() * 99) + 1);
            } while (spawn.canCreateCreep(rules[role].body, newName) === ERR_NAME_EXISTS);
            spawn.createCreep(rules[role].body, newName, {role});
            console.log('Spawning new ' + role + ': ' + newName);
            spawn.spawning = {name: newName};
            break;
        }
    }

    if (spawn.spawning) {
        const spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '\uD83D\uDEE0' + spawningCreep.name,
            Game.spawns['Spawn1'].pos.x,
            Game.spawns['Spawn1'].pos.y - 1,
            {opacity: 0.6});
    }
};