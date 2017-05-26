/**
 * Remotely attacks or heals creeps, or repairs structures. Can be targeted to any object in
 * the room. However, its effectiveness linearly depends on the distance. Each action consumes energy.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1-2</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>3-4</td>
 *         <td>1 tower</td>
 *     </tr>
 *     <tr>
 *         <td>5-6</td>
 *         <td>2 towers</td>
 *     </tr>
 *     <tr>
 *         <td>7</td>
 *         <td>3 towers</td>
 *     </tr>
 *     <tr>
 *         <td>8</td>
 *         <td>6 towers</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>5,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>3,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>1,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Energy per action</b></td>
 *         <td>10</td>
 *     </tr>
 *     <tr>
 *         <td><b>Attack effectiveness</b></td>
 *         <td>600 hits at range ≤5 to 150 hits at range ≥20</td>
 *     </tr>
 *     <tr>
 *         <td><b>Heal effectiveness</b></td>
 *         <td>400 hits at range ≤5 to 100 hits at range ≥20</td>
 *     </tr>
 *     <tr>
 *         <td><b>Repair effectiveness</b></td>
 *         <td>800 hits at range ≤5 to 200 hits at range ≥20</td>
 *     </tr>
 *
 * </table>
 */
interface StructureTower extends OwnedStructure {
    /**
     * The amount of energy containing in this structure.
     */
    energy: number,

    /**
     * The total amount of energy this structure can contain.
     */
    energyCapacity: number,

    /**
     * Remotely attack any creep in the room.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target creep.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The tower does not have enough energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid attackable object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient to use this structure.</td>
     *   </tr>
     * </table>
     */
    attack(target: Creep): number,

    /**
     * Remotely heal any creep in the room.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Creep} target The target creep.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The tower does not have enough energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid creep object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient to use this structure.</td>
     *   </tr>
     * </table>
     */
    heal(target: Creep): number,

    /**
     * Remotely repair any structure in the room.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {Structure} target The target structure.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The tower does not have enough energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid repairable object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient to use this structure.</td>
     *   </tr>
     * </table>
     */
    repair(target: Structure): number,

    /**
     * Transfer energy from the structure to a creep. The target has to be at adjacent square.
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
     *     <td>The structure contains less energy than the given amount.</td>
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