/**
 * Remotely transfers energy to another Link in the same room.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan="2"><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1-4</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>5</td>
 *         <td>2 links</td>
 *     </tr>
 *     <tr>
 *         <td>6</td>
 *         <td>3 links</td>
 *     </tr>
 *     <tr>
 *         <td>7</td>
 *         <td>4 links</td>
 *     </tr>
 *     <tr>
 *         <td>8</td>
 *         <td>6 links</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>5,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>1,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Capacity</b></td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cooldown time</b></td>
 *         <td>1 tick per tile of the linear distance to the target</td>
 *     </tr>
 *     <tr>
 *         <td><b>Energy loss</b></td>
 *         <td>3%</td>
 *     </tr>
 *
 * </table>
 */
interface StructureLink extends OwnedStructure {
    /**
     * The amount of game ticks the link has to wait until the next transfer is possible.
     */
    cooldown: number,

    /**
     * The amount of energy containing in the link.
     */
    energy: number,

    /**
     * The total amount of energy the link can contain.
     */
    energyCapacity: number,

    /**
     * Remotely transfer energy to another link at any location in the same room.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {StructureLink} target The target object.
     * @param {number} amount (optional) The amount of energy to be transferred. If omitted, all the available energy is used.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this link.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_NOT_ENOUGH_RESOURCES}</td>
     *     <td>The structure does not have the given amount of energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_TARGET}</td>
     *     <td>The target is not a valid StructureLink object.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_FULL}</td>
     *     <td>The target cannot receive any more energy.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td>The energy amount is incorrect.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_TIRED}</td>
     *     <td>The link is still cooling down.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient to use this link.</td>
     *   </tr>
     * </table>
     *
     * @example
     * const linkFrom = Game.rooms['W1N1'].lookForAt('structure', 10, 25)[0];
     *
     * const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 2,
     *     {filter: {structureType: STRUCTURE_LINK}})[0];
     *
     * linkFrom.transferEnergy(linkTo);
     */
    transferEnergy(target: StructureLink, amount?: number): number,
}