/**
 * Launches a nuke to another room dealing huge damage to the landing area. Each launch has a
 * cooldown and requires energy and ghodium resources. Launching creates a
 * {@link Nuke} object at the target room position which is visible to any player until it is landed.
 * Incoming nuke cannot be moved or cancelled. Nukes cannot be launched from or to novice rooms.
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
 *         <td>1 nuke</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>100,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>1,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Range</b></td>
 *         <td>10 rooms</td>
 *     </tr>
 *     <tr>
 *         <td><b>Launch cost</b></td>
 *         <td>300,000 energy<br /> 5,000 ghodium</td>
 *     </tr>
 *     <tr>
 *         <td><b>Launch cooldown</b></td>
 *         <td>100,000 ticks</td>
 *     </tr>
 *     <tr>
 *         <td><b>Landing time</b></td>
 *         <td>50,000 ticks</td>
 *     </tr>
 *     <tr>
 *         <td><b>Effect</b></td>
 *         <td>All creeps, construction sites and dropped resources in the room are removed immediately, even inside ramparts. Damage to structures:
 *             <ul>
 *                 <li>10,000,000 hits at the landing position;</li>
 *                 <li>5,000,000 hits to all structures in 5x5 area.</li>
 *             </ul>
 *             <p>Note that you can stack multiple nukes from different rooms at the same target position to increase damage.</p>
 *             <p>If the room is in safe mode, then the safe mode is cancelled immediately, and the safe mode cooldown is reset to 0.</p>
 *             <p>The room controller is hit by triggering <code>upgradeBlocked</code> period, which means it is unavailable to activate safe mode again within the next 200 ticks.</p>
 *         </td>
 *     </tr>
 *
 * </table>
 */
interface StructureNuker extends OwnedStructure {
    /**
     * The amount of energy containing in this structure.
     */
    energy: number,

    /**
     * The total amount of energy this structure can contain.
     */
    energyCapacity: number,

    /**
     * The amount of ghodium containing in this structure.
     */
    ghodium: number,

    /**
     * The total amount of ghodium this structure can contain.
     */
    ghodiumCapacity: number,

    /**
     * The amount of game ticks until the next launch is possible.
     */
    cooldown: number,

    /**
     * Launch a nuke to the specified position.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {RoomPosition} pos The target room position.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this structure.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The structure does not have enough energy and/or ghodium.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid RoomPosition.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_IN_RANGE}</td>
     *     <td>The target room is out of range.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>This structure is still cooling down.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient to use this structure.</td>
     *   </tr>
     * </table>
     *
     * @example
     * nuker.launchNuke(new RoomPosition(20,30, 'W1N1'));
     */
    launchNuke(pos: RoomPosition): number,
}