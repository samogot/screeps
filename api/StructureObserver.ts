/**
 * Provides visibility into a distant room from your script.
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
 *         <td>1 observer</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>8,000</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits</b></td>
 *         <td>500</td>
 *     </tr>
 *     <tr>
 *         <td><b>Range</b></td>
 *         <td>10 rooms</td>
 *     </tr>
 *
 * </table>
 */
interface StructureObserver extends OwnedStructure {
    /**
     * Provide visibility into a distant room from your script. The target room object will be available on the next tick.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {string} roomName The name of the target room.
     *
     * @return {number} One of the following codes:
     * <table>
     *   <tr>
     *     <td>{@link OK}</td>
     *     <td>The operation has been scheduled successfully.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td><code>roomName</code> argument is not a valid room name value.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_RCL_NOT_ENOUGH}</td>
     *     <td>Room Controller Level insufficient to use this structure.</td>
     *   </tr>
     * </table>
     */
    observeRoom(roomName: string): number,
}