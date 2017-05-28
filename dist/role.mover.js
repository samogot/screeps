const notify = (message) => {
    console.log(message);
    Game.notify(message);
};

const oneOfStructureTypes = (structure, types) => types.some(type => type === structure.structureType);

const oneOfMemoryRoles = (obj, roles) => roles.some(role => role === obj.memory.role);

/**
 * @param {Creep} creep
 * @param opts
 * @returns {string | null}
 */
const getEnergy = (creep, opts = {}) => {
    const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: struct => struct.structureType === STRUCTURE_CONTAINER
        && struct.hasEnergy
        && (!opts.sourceFilter || opts.sourceFilter(struct))
        && struct.memory.role === 'produce'
    });
    if (container) {
        if (creep.pos.isNearTo(container)) {
            if (creep.withdraw(container, RESOURCE_ENERGY) === OK) {
                return '\u27A1\uFE0F get ' + container
            } else {
                notify(creep + ' unexpected can\'t withdraw energy from ' + container + ' at ' + creep.pos);
                return null;
            }
        }
        else {
            if (creep.moveTo(container, {visualizePathStyle: {stroke: '#00ff00'}}) === OK) {
                return '\u27A1\uFE0F get ' + container
            } else {
                notify(creep + ' unexpected can\'t move to ' + container + ' from ' + creep.pos);
                return null;
            }
        }
    }
    else if (!opts.dontUseStorage && creep.room.storage && creep.room.storage.hasEnergy && (!opts.sourceFilter || opts.sourceFilter(creep.room.storage))) {
        if (creep.pos.isNearTo(creep.room.storage)) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === OK) {
                return '\u27A1\uFE0F get ' + creep.room.storage
            } else {
                notify(creep + ' unexpected can\'t withdraw energy from ' + container + ' at ' + creep.pos);
                return null;
            }
        }
        else {
            if (creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#00ff00'}}) === OK) {
                return '\u27A1\uFE0F get ' + creep.room.storage
            }
        }
    }
    return null;
};


/**
 * @param {Creep} creep
 * @returns {string | null}
 */
const tryRescueResources = creep => {
    let closestResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
        {filter: resource => resource.resourceType !== RESOURCE_ENERGY && resource.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length === 0});
    if (!closestResource) {
        closestResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
            {filter: resource => resource.amount > 50 && resource.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length === 0});
    }
    const creepFreeCapacity = creep.carryCapacity - _.sum(creep.carry);
    if (closestResource) {
        if (creepFreeCapacity > 0) {
            if (creep.pos.isNearTo(closestResource)) {
                if (closestResource.amount < creepFreeCapacity) {
                    const container = closestResource.pos.lookFor(LOOK_STRUCTURES).find(struct => struct.structureType === STRUCTURE_CONTAINER && struct.isFull);
                    if (container) {
                        const withdrawAmmount = Math.min(container.store[closestResource.resourceType], creepFreeCapacity - closestResource.amount - 10);
                        if (withdrawAmmount > 0) {
                            if (creep.withdraw(container, closestResource.resourceType, withdrawAmmount) === OK) {
                                return '\u27A1\uFE0F get ' + container;
                            }
                            else {
                                notify(creep + ' unexpected can\'t withdraw ' + closestResource.resourceType + ' from ' + container + ' at ' + creep.pos);
                                return null;
                            }
                        }
                    }
                }
                if (creep.pickup(closestResource) === OK) {
                    return '\u2197\uFE0F pickup ' + closestResource;
                }
                else {
                    notify(creep + ' unexpected can\'t pickup ' + closestResource + ' at ' + creep.pos);
                    return null;
                }
            }
            if (creep.moveTo(closestResource, {visualizePathStyle: {stroke: '#00ff00'}}) === OK) {
                return '\u2197\uFE0F pickup ' + closestResource
            } else {
                notify(creep + ' unexpected can\'t move to ' + closestResource + ' from ' + creep.pos);
                return null;
            }
        }
    }
    if (closestResource && creepFreeCapacity === 0 || creep.carryCapacity - creepFreeCapacity > creep.carry.energy) {
        if (creep.room.storage && !creep.room.storage.isFull) {
            if (creep.pos.isNearTo(creep.room.storage)) {
                for (let resourceType of _.keys(creep.carry)) {
                    if (creep.carry[resourceType] > 0) {
                        if (creep.transfer(creep.room.storage, resourceType) === OK) {
                            return '\u2B05\uFE0F put ' + creep.room.storage
                        } else {
                            notify(creep + ' unexpected can\'t transfer ' + resourceType + ' to ' + creep.room.storage + ' at ' + creep.pos);
                            return null;
                        }
                    }
                }
            }
            if (creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#00ff00'}}) === OK) {
                return '\u2B05\uFE0F put ' + creep.room.storage
            }
        }
    }

    return null;
};

/**
 * @param {Creep} creep
 * @param {object} opts
 * @returns {string | null}
 */
const tryFillUpStructure = (creep, opts = {}) => {
    const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: struct => (!opts.structureTypes || oneOfStructureTypes(struct, opts.structureTypes))
        && (!opts.structureFilter || opts.structureFilter(struct))
        && !struct.isFull
    });
    if (structure) {
        if (!creep.hasEnergy) {
            return getEnergy(creep, opts);
        }
        if (creep.pos.isNearTo(structure)) {
            if (creep.transfer(structure, RESOURCE_ENERGY) === OK) {
                return '\u2B05\uFE0F put ' + structure
            } else {
                notify(creep + ' unexpected can\'t transfer energy to ' + structure + ' at ' + creep.pos);
                return null;
            }
        }
        else {
            if (creep.moveTo(structure, {visualizePathStyle: {stroke: '#00ff00'}}) === OK) {
                return '\u2B05\uFE0F put ' + structure
            } else {
                notify(creep + ' unexpected can\'t move to ' + structure + ' from ' + creep.pos);
                return null;
            }
        }
    }
    return null;
};

/**
 * @param {Creep} creep
 * @param {object} opts
 * @param {function?} opts.creepFilter
 * @returns {string | null}
 */
const tryFillUpCreep = (creep, opts = {}) => {
    /** @type {Creep} */
    const recipient = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        filter: creep => (!opts.creepRoles || oneOfMemoryRoles(creep, opts.creepRoles))
        && (!opts.creepFilter || opts.creepFilter(creep))
    });
    if (recipient) {
        if (!creep.hasEnergy) {
            return getEnergy(creep, opts);
        }
        if (creep.pos.isNearTo(recipient)) {
            if (opts.waitFilter(recipient)) {
                return '\uD83D\uDD51 wait ' + recipient;
            }
            else if (!recipient.isFull) {
                if (creep.transfer(recipient, RESOURCE_ENERGY) === OK) {
                    return '\u2B05\uFE0F put ' + recipient
                } else {
                    notify(creep + ' unexpected can\'t transfer energy to ' + recipient + ' at ' + creep.pos);
                    return null;
                }
            }
        }
        else {
            if (creep.moveTo(recipient, {visualizePathStyle: {stroke: '#00ff00'}}) === OK) {
                return '\u2B05\uFE0F put ' + recipient
            } else {
                notify(creep + ' unexpected can\'t move to ' + recipient + ' from ' + creep.pos);
                return null;
            }
        }
    }
    return null;
};

/**
 * @param {Creep} creep
 * @param {StructureSpawn} spawn
 * @returns {string | null}
 */
const doRecycle = function (creep, spawn) {
    if (creep.pos.isNearTo(spawn)) {
        spawn.recycleCreep(creep);
        return '\u267B\uFE0F recycle ' + spawn;
    }
    if (creep.moveTo(spawn, {visualizePathStyle: {stroke: '#00ff00'}}) === OK) {
        return '\u267B\uFE0F recycle ' + spawn;
    }
    return null;
};

/**
 * @param {Creep} creep
 * @returns {string | null}
 */
const tryRecyleTemporary = creep => {
    if (creep.memory.temporary) {
        const mover = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: creep => oneOfMemoryRoles(creep, ['mover'])});
        if (mover) {
            const nearestSpawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if (!mover.spawning) {
                return doRecycle(creep, nearestSpawn);
            }
            else {
                const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {filter: spawn => spawn.spawning && creeps[spawn.spawning.name].memory.role === 'mover'});
                if (spawn.spawning.remainingTime <= creep.pos.findPathTo(nearestSpawn).length) {
                    return doRecycle(creep, nearestSpawn);
                }
            }
        }
    }
    return null;
};

module.exports = {

    name: 'mover',

    /** @param {Creep} creep **/
    run: function (creep) {
        const activity =
            tryRecyleTemporary(creep)
            || tryRescueResources(creep)
            || tryFillUpStructure(creep, {structureTypes: [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]})
            || tryFillUpStructure(creep, {
                structureTypes: [STRUCTURE_TOWER],
                structureFilter: tower => !tower.memory.working || tower.energy < tower.energyCapacity / 2,
                sourceFilter: struct => creep.carryCapacity <= struct.store.energy
            })
            || tryFillUpStructure(creep, {
                structureTypes: [STRUCTURE_CONTAINER],
                structureFilter: container => container.store.energy < container.storeCapacity / 2
                && oneOfMemoryRoles(container, ['consume', 'suffice']),
                sourceFilter: struct => creep.carryCapacity <= struct.store.energy
            })
            || tryFillUpCreep(creep, {
                creepRoles: ['builder'],
                sourceFilter: struct => creep.carryCapacity <= struct.store.energy,
                creepFilter: creep => !creep.isFull || creep.memory.working,
                waitFilter: creep => creep.memory.working && creep.carry.energy > creep.carryCapacity / 2
            })
            || tryFillUpStructure(creep, {
                structureTypes: [STRUCTURE_STORAGE],
                sourceFilter: struct => creep.carryCapacity <= struct.store.energy,
                dontUseStorage: true
            });

        if (activity) {
            if (creep.memory.activity !== activity) {
                creep.say(activity.split(' [')[0]);
            }
        }
        else {
            creep.say('idle');
        }

        creep.memory.activity = activity;
    }
};