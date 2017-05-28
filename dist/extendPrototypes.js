// Creep
Object.defineProperties(Creep.prototype, {
    /**
     * Check if creep has energy in carry
     * @readonly
     * @type {boolean}
     * @name Creep#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {Creep} */
        get() {
            return this.carry.energy > 0;
        }
    },

    /**
     * Check if creep's carry is full
     * @readonly
     * @type {boolean}
     * @name Creep#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {Creep} */
        get() {
            return _.sum(this.carry) === this.carryCapacity;
        }
    }
});

/**
 * Computes real power of creeps method taking into account all body parts and their boost
 * @this {Creep}
 * @param {string} needBodyPart
 * @param {number} basePower
 * @param {string} method
 * @return {number}
 */
Creep.prototype.getRealPower = function (needBodyPart, basePower, method) {
    return _.sum(this.body, bodyPart => {
        let power = 0;
        if (bodyPart.hits > 0 && bodyPart.type === needBodyPart) {
            power = basePower;
            if (bodyPart.boost) {
                power *= BOOSTS[needBodyPart][bodyPart.boost][method];
            }
        }
        return power;
    });
};

/**
 * Computes real damage applied to creep's body parts taking tough boosts into account
 * @this {Creep}
 * @param incomeDamage
 * @return {number}
 */
Creep.prototype.getRealDamage = function (incomeDamage) {
    let realDamage = 0, restOfIncomeDamage = incomeDamage;
    for (let bodyPart of this.body) {
        if (bodyPart.hits > 0) {
            const boost = bodyPart.type === TOUGH && bodyPart.boost ? BOOSTS[TOUGH][bodyPart.boost].damage : 1;
            const damageToBodyPart = Math.min(bodyPart.hits, restOfIncomeDamage * boost);
            realDamage += damageToBodyPart;
            restOfIncomeDamage -= damageToBodyPart / boost;
        }
        if (restOfIncomeDamage === 0) break;
    }
    return realDamage + restOfIncomeDamage;
};


// Structure
Object.defineProperties(Structure.prototype, {
    /**
     * A shorthand to <code>Memory.structures[structure.id]</code>. You can use it for quick access the structure’s specific memory data object. {@link http://docs.screeps.com/global-objects.html#Memory-object Learn more about memory}
     * @type {any}
     * @name Structure#memory
     */
    memory: {
        enumerable: false,
        configurable: true,
        /** @this {Structure} */
        get() {
            if (_.isUndefined(Memory.structures)) Memory.structures = {};
            if (!_.isObject(Memory.structures)) return undefined;
            return Memory.structures[this.id] = Memory.structures[this.id] || {};
        },
        /** @this {Structure} */
        set(value) {
            if (_.isUndefined(Memory.structures)) Memory.structures = {};
            if (!_.isObject(Memory.structures)) throw new Error('Could not set structure memory');
            Memory.structures[this.id] = value;
        }
    }
});


// StructureContainer
Object.defineProperties(StructureContainer.prototype, {
    /**
     * Check if structure has energy in store
     * @readonly
     * @type {boolean}
     * @name StructureContainer#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureContainer} */
        get() {
            return storeStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's store is full
     * @readonly
     * @type {boolean}
     * @name StructureContainer#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureContainer} */
        get() {
            return storeStructureIsFull(this);
        }
    }
});


// StructureStorage
Object.defineProperties(StructureStorage.prototype, {
    /**
     * Check if structure has energy in store
     * @readonly
     * @type {boolean}
     * @name StructureStorage#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureStorage} */
        get() {
            return storeStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's store is full
     * @readonly
     * @type {boolean}
     * @name StructureStorage#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureStorage} */
        get() {
            return storeStructureIsFull(this);
        }
    }
});


// StructureTerminal
Object.defineProperties(StructureTerminal.prototype, {
    /**
     * Check if structure has energy in store
     * @readonly
     * @type {boolean}
     * @name StructureTerminal#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureTerminal} */
        get() {
            return storeStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's store is full
     * @readonly
     * @type {boolean}
     * @name StructureTerminal#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureTerminal} */
        get() {
            return storeStructureIsFull(this);
        }
    }
});


// StructureExtension
Object.defineProperties(StructureExtension.prototype, {
    /**
     * Check if structure has energy
     * @readonly
     * @type {boolean}
     * @name StructureExtension#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureExtension} */
        get() {
            return energyStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's energy is full
     * @readonly
     * @type {boolean}
     * @name StructureExtension#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureExtension} */
        get() {
            return energyStructureIsFull(this);
        }
    }
});


// StructureLab
Object.defineProperties(StructureLab.prototype, {
    /**
     * Check if structure has energy
     * @readonly
     * @type {boolean}
     * @name StructureLab#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureLab} */
        get() {
            return energyStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's energy is full
     * @readonly
     * @type {boolean}
     * @name StructureLab#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureLab} */
        get() {
            return energyStructureIsFull(this);
        }
    }
});


// StructureLink
Object.defineProperties(StructureLink.prototype, {
    /**
     * Check if structure has energy
     * @readonly
     * @type {boolean}
     * @name StructureLink#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureLink} */
        get() {
            return energyStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's energy is full
     * @readonly
     * @type {boolean}
     * @name StructureLink#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureLink} */
        get() {
            return energyStructureIsFull(this);
        }
    }
});


// StructureNuker
Object.defineProperties(StructureNuker.prototype, {
    /**
     * Check if structure has energy
     * @readonly
     * @type {boolean}
     * @name StructureNuker#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureNuker} */
        get() {
            return energyStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's energy is full
     * @readonly
     * @type {boolean}
     * @name StructureNuker#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureNuker} */
        get() {
            return energyStructureIsFull(this);
        }
    }
});


// StructurePowerSpawn
Object.defineProperties(StructurePowerSpawn.prototype, {
    /**
     * Check if structure has energy
     * @readonly
     * @type {boolean}
     * @name StructurePowerSpawn#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructurePowerSpawn} */
        get() {
            return energyStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's energy is full
     * @readonly
     * @type {boolean}
     * @name StructurePowerSpawn#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructurePowerSpawn} */
        get() {
            return energyStructureIsFull(this);
        }
    }
});


// StructureSpawn
Object.defineProperties(StructureSpawn.prototype, {
    /**
     * Check if structure has energy
     * @readonly
     * @type {boolean}
     * @name StructureSpawn#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureSpawn} */
        get() {
            return energyStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's energy is full
     * @readonly
     * @type {boolean}
     * @name StructureSpawn#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureSpawn} */
        get() {
            return energyStructureIsFull(this);
        }
    }
});


// StructureTower
Object.defineProperties(StructureTower.prototype, {
    /**
     * Check if structure has energy
     * @readonly
     * @type {boolean}
     * @name StructureTower#hasEnergy
     */
    hasEnergy: {
        enumerable: false,
        configurable: true,
        /** @this {StructureTower} */
        get() {
            return energyStructureHasEnergy(this);
        }
    },

    /**
     * Check if structure's energy is full
     * @readonly
     * @type {boolean}
     * @name StructureTower#isFull
     */
    isFull: {
        enumerable: false,
        configurable: true,
        /** @this {StructureTower} */
        get() {
            return energyStructureIsFull(this);
        }
    }
});

/**
 * Compute tower power taking distance to target into account
 * @private
 * @this {StructureTower}
 * @param {RoomPosition|RoomObject} target
 * @param {number} optimalPower
 * @return {number}
 */
StructureTower.prototype.getPowerAt = function (target, optimalPower) {
    return optimalPower * TOWER_OPTIMAL_RANGE
        / Math.max(Math.min(this.pos.getRangeTo(target), TOWER_FALLOFF_RANGE), TOWER_OPTIMAL_RANGE);
};

/**
 * Compute tower attack power taking distance to target into account
 * @this {StructureTower}
 * @param {RoomPosition|Creep} target
 * @return {number}
 */
StructureTower.prototype.getAttackPowerAt = function (target) {
    return this.getPowerAt(target, TOWER_POWER_ATTACK);
};

/**
 * Compute tower repair power taking distance to target into account
 * @this {StructureTower}
 * @param {RoomPosition|Structure} target
 * @return {number}
 */
StructureTower.prototype.getRepairPowerAt = function (target) {
    return this.getPowerAt(target, TOWER_POWER_REPAIR);
};

/**
 * Compute tower heal power taking distance to target into account
 * @this {StructureTower}
 * @param {RoomPosition|Creep} target
 * @return {number}
 */
StructureTower.prototype.getHealPowerAt = function (target) {
    return this.getPowerAt(target, TOWER_POWER_HEAL);
};


// RoomPosition
Object.defineProperties(RoomPosition.prototype, {
    /**
     * Checks if this RoomPosition is obstacle
     * @readonly
     * @type {boolean}
     * @name RoomPosition#isObstacle
     */
    isObstacle: {
        enumerable: false,
        configurable: true,
        /** @this {RoomPosition} */
        get() {
            const looks = this.look();
            return looks.some(look =>
                look.type === LOOK_CREEPS
                || (look.type === LOOK_STRUCTURES && OBSTACLE_OBJECT_TYPES.includes(look[LOOK_STRUCTURES].structureType))
                || (look.type === LOOK_TERRAIN && look[LOOK_TERRAIN] === 'wall')
            );
        }
    },
});


// Helpers
/**
 * Check if structure has energy in store
 * @param {StructureContainer|StructureStorage|StructureTerminal} structure
 * @return {boolean}
 */
const storeStructureHasEnergy = structure => structure.store.energy > 0;

/**
 * Check if structure's store is full
 * @param {StructureContainer|StructureStorage|StructureTerminal} structure
 * @return {boolean}
 */
const storeStructureIsFull = structure => _.sum(structure.store) === structure.storeCapacity;

/**
 * Check if structure has energy
 * @param {StructureExtension|StructureLab|StructureLink|StructureNuker|StructurePowerSpawn|StructureSpawn|StructureTower} structure
 * @return {boolean}
 */
const energyStructureHasEnergy = structure => structure.energy > 0;

/**
 * Check if structure's energy is full
 * @param {StructureExtension|StructureLab|StructureLink|StructureNuker|StructurePowerSpawn|StructureSpawn|StructureTower} structure
 * @return {boolean}
 */
const energyStructureIsFull = structure => structure.energy === structure.energyCapacity;

