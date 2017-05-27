function deleteUnusedMemory() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

module.exports = function (rules) {
    const counts = {};
    const getCount = role => counts[role] || 0;
    for (let creep of _.values(Game.creeps)) {
        if (creep.spawning || creep.ticksToLive > CREEP_SPAWN_TIME * rules[creep.memory.role].body.length) {
            counts[creep.memory.role] = getCount(creep.memory.role) + 1;
        }
    }

    const spawn = Game.spawns['Spawn1'];
    for (let role of _.keys(rules)) {
        if (getCount(role) < rules[role].count && spawn.canCreateCreep(rules[role].body) === OK) {
            deleteUnusedMemory();
            const namePrefix = capitalizeFirstLetter(role);
            let newName;
            do {
                name = namePrefix + (Math.floor(Math.random() * 99) + 1);
            } while (spawn.canCreateCreep(rules[role].body, name) === ERR_NAME_EXISTS);
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
            Game.spawns['Spawn1'].pos.y + 1,
            {opacity: 0.6});
    }
};