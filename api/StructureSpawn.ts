/**
 * Spawn is your colony center. This structure can create, renew, and recycle creeps.
 * All your spawns are accessible through {@link Game.spawns} hash list. 
 * Spawns auto-regenerate a little amount of energy each tick, so that you can easily recover even if all your creeps died.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1-6</td>
 *         <td>1 spawn</td>
 *     </tr>
 *     <tr>
 *         <td>7</td>
 *         <td>2 spawns</td>
 *     </tr>
 *     <tr>
 *         <td>8</td>
 *         <td>3 spawns</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>15,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>5,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>300</td>
 *     </tr>
 *     <tr>
 *         <td><b>Spawn time</b></td>
 *         <td>3 ticks per each body part</td>
 *     </tr>
 *     <tr>
 *         <td><b>Energy auto-regeneration</b></td>
 *         <td>1 energy unit per tick while energy available in the room (in all spawns and extensions) is less than 300</td>
 *     </tr>
 *
 * </table>
 */
interface StructureSpawn extends OwnedStructure {
    /**
     * The amount of energy containing in the spawn.
     */
    energy: number,

    /**
     * The total amount of energy the spawn can contain
     */
    energyCapacity: number,

    /**
     * A shorthand to <code>Memory.spawns[spawn.name]</code>. You can use it for quick access the spawn’s specific memory data object. {@link http://docs.screeps.com/global-objects.html#Memory-object Learn more about memory}
     *
     * @example
     * spawn.memory.queue = [];
     */
    memory: any,

    /**
     * Spawn’s name. You choose the name upon creating a new spawn, and it cannot be changed later. This name is a hash key to access the spawn via the {@link Game.spawns} object.
     */
    name: string,

    /**
     * If the spawn is in process of spawning a new creep, this object will contain the new creep’s information, or null otherwise.
     */
    spawning: {

        /**
         * The name of a new creep.
         */
        name: string,

        /**
         * Time needed in total to complete the spawning.
         */
        needTime: number,

        /**
         * Remaining time to go.
         */
        remainingTime: number,
    } | null,

    /**
     * Check if a creep can be created.
     *
     * This method has low CPU cost.
     *
     * @param {Array<string>} body An array describing the new creep’s body. Should contain 1 to 50 elements with one of these constants:
     * <ul>
     *     <li><code>WORK</code></li>
     *     <li><code>MOVE</code></li>
     *     <li><code>CARRY</code></li>
     *     <li><code>ATTACK</code></li>
     *     <li><code>RANGED_ATTACK</code></li>
     *     <li><code>HEAL</code></li>
     *     <li><code>TOUGH</code></li>
     *     <li><code>CLAIM</code></li>
     * </ul>
     * @param {string} name (optional) The name of a new creep. It should be unique creep name, i.e. the <code>Game.creeps</code> object should not contain another creep with the same name (hash key). If not defined, a random name will be generated.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>A creep with the given body and name can be created.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this spawn.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NAME_EXISTS}</td>
     *     <td>There is a creep with the same name already.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The spawn is already in process of spawning another creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_ENERGY}</td>
     *     <td>The spawn and its extensions contain not enough energy to create a creep with the given body.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>Body is not properly described.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Your Room Controller level is insufficient to use this spawn.</td>
     *   </tr>
     * </table>
     *
     * @example
     * if(spawn.canCreateCreep(body, name) == OK) {
	 *     spawn.createCreep(body, name);
	 * }
     */
    canCreateCreep(body: Array<string>, name?: string): number,

    /**
     * Start the creep spawning process. The required energy amount can be withdrawn from all spawns and extensions in the room.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Array<string>} body An array describing the new creep’s body. Should contain 1 to 50 elements with one of these constants:
     * <ul>
     *     <li><code>WORK</code></li>
     *     <li><code>MOVE</code></li>
     *     <li><code>CARRY</code></li>
     *     <li><code>ATTACK</code></li>
     *     <li><code>RANGED_ATTACK</code></li>
     *     <li><code>HEAL</code></li>
     *     <li><code>TOUGH</code></li>
     *     <li><code>CLAIM</code></li>
     * </ul>
     * @param {string} name (optional) The name of a new creep. It should be unique creep name, i.e. the <code>Game.creeps</code> object should not contain another creep with the same name (hash key). If not defined, a random name will be generated.
     * @param memory (optional) The memory of a new creep. If provided, it will be immediately stored into <code>Memory.creeps[name]</code>.
     *
     * @return {number} The name of a new creep or one of these error codes:
     * <table>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this spawn.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NAME_EXISTS}</td>
     *     <td>There is a creep with the same name already.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The spawn is already in process of spawning another creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_ENERGY}</td>
     *     <td>The spawn and its extensions contain not enough energy to create a creep with the given body.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>Body is not properly described.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Your Room Controller level is insufficient to use this spawn.</td>
     *   </tr>
     * </table>
     *
     * @example
     * Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], 'Worker1');
     *
     * @example
     * Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], null,
     *     {role: 'harvester'});
     *
     * @example
     * const result = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE]);
     *
     * if(_.isString(result)) {
	 *     console.log('The name is: '+result);
	 * }
     * else {
	 *     console.log('Spawn error: '+result);
	 * }
     */
    createCreep(body: Array<string>, name?: string, memory?: any): number,

    /**
     * Kill the creep and drop up to 100% of resources spent on its spawning and boosting depending on remaining life time. The target should be at adjacent square.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target creep object.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this spawn or the target creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The specified target object is not a creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target creep is too far away.</td>
     *   </tr>
     * </table>
     */
    recycleCreep(target: Creep): number,

    /**
     * Increase the remaining time to live of the target creep. The target should be at adjacent square.
     * The spawn should not be busy with the spawning process. Each execution increases the creep's timer
     * by amount of ticks according to this formula:
     *
     * <code>
     * floor(600/body_size)
     * </code>
     *
     * Energy required for each execution is determined using this formula:
     *
     * <code>
     * ceil(creep_cost/2.5/body_size)
     * </code>
     *
     * Renewing a creep removes all of its boosts.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target creep object.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this spawn.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>The spawn is spawning another creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_ENERGY}</td>
     *     <td>The spawn does not have enough energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The specified target object is not a creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target creep's time to live timer is full.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target creep is too far away.</td>
     *   </tr>
     * </table>
     */
    renewCreep(target: Creep): number,

    /**
     * Transfer the energy from the spawn to a creep.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The creep object which energy should be transferred to.
     * @param {number} amount (optional) The amount of energy to be transferred. If omitted, all the remaining amount of energy will be used.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this spawn.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_ENERGY}</td>
     *     <td>The spawn contains less energy than the given amount.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The specified target object is not a creep.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target creep can not carry the given amount of energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target creep is too far away.</td>
     *   </tr>
     * </table>
     *
     * @deprecated Please use {@link Creep.withdraw} instead.
     */
    transferEnergy(target: Creep, amount?: number): number,
}