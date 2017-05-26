/**
 * Processes power into your account, and spawns power creeps with special unique powers (in development).
 * Learn more about power from {@link http://support.screeps.com/hc/en-us/articles/205971132-Power this article}.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1-7</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>8</td>
 *         <td>1 power spawn</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>100,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>5,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>5,000 energy units, 100 power units</td>
 *     </tr>
 *     <tr>
 *         <td><b>Processing cost</b></td>
 *         <td>50 energy units per 1 power unit</td>
 *     </tr>
 *     <tr>
 *         <td><b>Processing speed</b></td>
 *         <td>1 power unit per tick</td>
 *     </tr>
 *
 * </table>
 */
interface StructurePowerSpawn extends OwnedStructure {
    /**
     * The amount of energy containing in this structure.
     */
    energy: number,

    /**
     * The total amount of energy this structure can contain.
     */
    energyCapacity: number,

    /**
     * The amount of power containing in this structure.
     */
    power: number,

    /**
     * The total amount of power this structure can contain.
     */
    powerCapacity: number,

    /**
     * Create a power creep. <i>This method is under development.</i>
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} roomName The name of the power creep.
     */
    createPowerCreep(roomName: string),

    /**
     * Register power resource units into your account. Registered power allows to develop power creeps skills.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The structure does not have enough energy or power resource units.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient to use this structure.</td>
     *   </tr>
     * </table>
     */
    processPower(): number,

    /**
     * Transfer the energy from this structure to a creep. You can transfer resources to your creeps from hostile structures as well.
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
     *     <td>You are not the owner of the target creep, or there is a hostile rampart on top of the structure.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>This structure less energy than the given amount.</td>
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