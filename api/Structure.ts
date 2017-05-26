/**
 * The base prototype object of all structures.
 */
interface Structure extends RoomObject {
    /**
     * The current amount of hit points of the structure.
     */
    hits: number,

    /**
     * The total amount of hit points of the structure.
     */
    hitsMax: number,

    /**
     * A unique object identificator. You can use {@link Game.getObjectById} method to retrieve an object instance by its <code>id</code>.
     */
    id: string,

    /**
     * One of the <code>STRUCTURE_*</code> constants.
     */
    structureType: string,

    /**
     * Destroy this structure immediately.
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
     *     <td>{@link ERR_NOT_OWNER}</td>
     *     <td>You are not the owner of this structure.</td>
     *   </tr>
     *   <tr>
     *     <td>{@link ERR_BUSY}</td>
     *     <td>Hostile creeps are in the room.</td>
     *   </tr>
     * </table>
     */
    destroy(): number,

    /**
     * Check whether this structure can be used. If room controller level is insufficient, then this method will return false, and the structure will be highlighted with red in the game.
     *
     * This method has medium CPU cost.
     *
     * @return {boolean} A boolean value.
     */
    isActive(): boolean,

    /**
     * Toggle auto notification when the structure is under attack. The notification will be sent to your account email. Turned on by default.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {boolean} enabled Whether to enable notification or disable.
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
     *     <td>{@link ERR_INVALID_ARGS}</td>
     *     <td><code>enable</code> argument is not a boolean value.</td>
     *   </tr>
     * </table>
     */
    notifyWhenAttacked(enabled: boolean): number,
}