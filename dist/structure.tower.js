/** @param {Creep} creep */
const getMeleeHealInThisTick = (creep) => creep.getRealPower(HEAL, HEAL_POWER, 'heal');

/** @param {Creep} creep */
const getRangedHealInThisTick = (creep) => creep.getRealPower(HEAL, RANGED_HEAL_POWER, 'rangedHeal');

/**
 * @param {StructureTower} tower
 * @param {Creep} creep
 */
const getTowerDamageInThisTick = (tower, creep) => creep.getRealDamage(tower.getAttackPowerAt(creep));

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
            const dpt = getTowerDamageInThisTick(tower, closestHostile);
            if (closestHostile.hits < dpt * KILL_IN_N_TICKS) {
                const meleeHPT = _.sum(closestHostile.pos.findInRange(FIND_HOSTILE_CREEPS, 1), creep => getMeleeHealInThisTick(creep));
                const rangedHPT = _.sum(closestHostile.pos.findInRange(FIND_HOSTILE_CREEPS, 3,
                    {filter: creep => closestHostile.pos.getRangeTo(creep) > 1}), creep => getRangedHealInThisTick(creep));
                const hpt = meleeHPT + rangedHPT;
                if (closestHostile.hits < (dpt - hps) * KILL_IN_N_TICKS) {
                    tower.attack(closestHostile);
                    return true;
                }
            }
            if (closestHostile.pos.getRangeTo(tower) <= TOWER_OPTIMAL_RANGE
                && getTowerDamageInThisTick(tower, closestHostileHealer) <= getMeleeHealInThisTick(closestHostileHealer)) {
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
        filter: (structure) => structure.hits <= structure.hitsMax - tower.getRepairPowerAt(structure)
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
        filter: creep => creep.hits <= creep.hitsMax - tower.getHealPowerAt(creep)
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