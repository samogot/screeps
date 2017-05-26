function deleteUnusedMemory() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

module.exports = function (rules) {
    var counts = {};
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive > CREEP_SPAWN_TIME * rules[creep.memory.role].body.length) {
            counts[creep.memory.role] = (counts[creep.memory.role] || 0) + 1;
        }
    }

    for (var role in rules) {
        if ((counts[role] || 0) < rules[role].count) {
            var newName = Game.spawns['Spawn1'].createCreep(rules[role].body, undefined, {role});
            console.log('Spawning new ' + role + ': ' + newName);
            deleteUnusedMemory();
            break;
        }
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}