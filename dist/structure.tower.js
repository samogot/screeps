/**
 * @param {StructureTower} tower
 * @param {RoomPosition|RoomObject} target
 * @param {number} optimalPower
 * @return {number}
 */
const getPowerAt = (tower, target, optimalPower) => optimalPower * TOWER_OPTIMAL_RANGE
/ Math.max(Math.min(tower.pos.getRangeTo(target), TOWER_FALLOFF_RANGE), TOWER_OPTIMAL_RANGE);

/**
 * @param {Creep} creep
 * @param {string} needBodyPart
 * @param {number} basePower
 * @param {string} method
 */
const getRealPower = (creep, needBodyPart, basePower, method) => _.sum(creep.body, bodyPart => {
    let power = 0;
    if (bodyPart.hits > 0 && bodyPart.type === needBodyPart) {
        power = basePower;
        if (bodyPart.boost) {
            power *= BOOSTS[needBodyPart][bodyPart.boost][method];
        }
    }
    return power;
});

const getDefenceBoost = creep => {
    const firstActiveBodyPart = creep.body.find(bodyPart => bodyPart.hits > 0);
    if (firstActiveBodyPart.type === TOUGH && firstActiveBodyPart.boost) {
        return BOOSTS[TOUGH][firstActiveBodyPart.boost].damage;
    }
    return 1;
};

/** @param {Creep} creep */
const getMeleeHealPerTick = (creep) => getRealPower(creep, HEAL, HEAL_POWER, 'heal');

/** @param {Creep} creep */
const getRangedHealPerTick = (creep) => getRealPower(creep, HEAL, RANGED_HEAL_POWER, 'rangedHeal');

const getTowerDamagePerTick = (tower, creep) => getPowerAt(tower, creep, TOWER_POWER_ATTACK) * getDefenceBoost(creep);

/**
 * @param {StructureTower} tower
 * @returns {boolean}
 */
const tryAttackHostile = (tower) => {
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    const closestHostileHealer = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: creep => creep.getActiveBodyparts(HEAL) > 0
    });
    if (closestHostileHealer && closestHostileHealer !== closestHostile) {
        const rangeFromHealerToClosest = closestHostileHealer.pos.getRangeTo(closestHostile);
        if (rangeFromHealerToClosest <= 3) {
            const KILL_IN_N_TICKS = 3;
            const dpt = getTowerDamagePerTick(tower, closestHostile);
            if (closestHostile.hits < dpt * KILL_IN_N_TICKS) {
                const meleeHPT = _.sum(closestHostile.pos.findInRange(FIND_HOSTILE_CREEPS, 1), creep => getMeleeHealPerTick(creep));
                const rangedHPT = _.sum(closestHostile.pos.findInRange(FIND_HOSTILE_CREEPS, 3,
                    {filter: creep => closestHostile.pos.getRangeTo(creep) > 1}), creep => getRangedHealPerTick(creep));
                const hpt = meleeHPT + rangedHPT;
                if (closestHostile.hits < (dpt - hps) * KILL_IN_N_TICKS) {
                    tower.attack(closestHostile);
                    return true;
                }
            }
            if (closestHostile.pos.getRangeTo(tower) <= TOWER_OPTIMAL_RANGE
                && getTowerDamagePerTick(tower, closestHostileHealer) <= getMeleeHealPerTick(closestHostileHealer)) {
                const allHostileInOptimalRange = tower.pos.findInRange(FIND_HOSTILE_CREEPS, TOWER_OPTIMAL_RANGE);
                const lowestHitsHostile = allHostileInOptimalRange.reduce((m, c) => m.hits < c.hits ? m : c);
                tower.attack(lowestHitsHostile);
                return true;
            }
            tower.attack(closestHostileHealer);
            return true;
        }
    }
    if (closestHostile) {
        tower.attack(closestHostile);
        return true;
    }
    return false;
};

/**
 * @param {StructureTower} tower
 * @returns {boolean}
 */
const tryHeavyRepairStructure = (tower) => {
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits <= structure.hitsMax / 2
        && structure.structureType !== STRUCTURE_WALL
        && structure.structureType !== STRUCTURE_RAMPART
    });
    if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
        return true;
    }
    return false;
};

/**
 * @param {StructureTower} tower
 * @returns {boolean}
 */
const tryRepairStructure = (tower) => {
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits <= structure.hitsMax - getPowerAt(tower, structure, TOWER_POWER_REPAIR)
        && structure.structureType !== STRUCTURE_WALL
        && structure.structureType !== STRUCTURE_RAMPART
    });
    if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
        return true;
    }
    return false;
};

/**
 * @param {StructureTower} tower
 * @returns {boolean}
 */
const tryHealCreep = (tower) => {
    const closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: creep => creep.hits <= creep.hitsMax - getPowerAt(tower, creep, TOWER_POWER_HEAL)
    });
    if (closestDamagedCreep) {
        tower.heal(closestDamagedCreep);
        return true;
    }
    return false;
};

const stopIf = condition => condition;

module.exports = {

    name: STRUCTURE_TOWER,

    /** @param {StructureTower} tower */
    run: function (tower) {
        stopIf(tower.energy === 0)
        || tryAttackHostile(tower)
        || tryHeavyRepairStructure(tower)
        || tryHealCreep(tower)
        || stopIf(tower.energy < tower.energyCapacity / 2)
        || tryRepairStructure(tower);
    }
};