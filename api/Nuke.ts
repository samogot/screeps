/**
 * A nuke landing position. This object cannot be removed or modified. You can find incoming nukes in the room using the <code>FIND_NUKES</code> constant.
 *
 * <table class="table gameplay-info">
 *
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
 *             <p>If the room is in safe mode, then the safe mode is cancelled immediately, and the safe mode cooldown is reset to 0.</p>
 *             <p>The room controller is hit by triggering <code>upgradeBlocked</code> period, which means it is unavailable to activate safe mode again within the next 200 ticks.</p>
 *         </td>
 *     </tr>
 *
 * </table>
 */
interface Nuke extends RoomObject {
    /**
     * A unique object identificator. You can use {@link Game.getObjectById} method to retrieve an object instance by its <code>id</code>.
     */
    id: string,

    /**
     * The name of the room where this nuke has been launched from.
     */
    launchRoomName: string,

    /**
     * The remaining landing time.
     */
    timeToLand: number,
}