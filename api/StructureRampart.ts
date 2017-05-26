/**
 * Blocks movement of hostile creeps, and defends your creeps and structures on the same tile.
 * Can be used as a controllable gate.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td colspan=2><b>Controller level</b></td>
 *     </tr>
 *     <tr>
 *         <td>1</td>
 *         <td>—</td>
 *     </tr>
 *     <tr>
 *         <td>2</td>
 *         <td>300,000 max hits</td>
 *     </tr>
 *     <tr>
 *         <td>3</td>
 *         <td>1,000,000 max hits</td>
 *     </tr>
 *     <tr>
 *         <td>4</td>
 *         <td>3,000,000 max hits</td>
 *     </tr>
 *     <tr>
 *         <td>5</td>
 *         <td>10,000,000 max hits</td>
 *     </tr>
 *     <tr>
 *         <td>6</td>
 *         <td>30,000,000 max hits</td>
 *     </tr>
 *     <tr>
 *         <td>7</td>
 *         <td>100,000,000 max hits</td>
 *     </tr>
 *     <tr>
 *         <td>8</td>
 *         <td>300,000,000 max hits</td>
 *     </tr>
 *     <tr>
 *         <td><b>Cost</b></td>
 *         <td>1</td>
 *     </tr>
 *     <tr>
 *         <td><b>Hits when constructed</b></td>
 *         <td>1</td>
 *     </tr>
 *     <tr>
 *         <td><b>Decay</b></td>
 *         <td>Loses 300 hits every 100 ticks</td>
 *     </tr>
 *
 * </table>
 */
interface StructureRampart extends OwnedStructure {
    /**
     * If false (default), only your creeps can step on the same square. If true, any hostile creeps can pass through.
     */
    isPublic: boolean,

    /**
     * The amount of game ticks when this rampart will lose some hit points.
     */
    ticksToDecay: number,

    /**
     * Make this rampart public to allow other players' creeps to pass through.
     *
     * This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if {@link OK} code is returned.
     *
     * @param {boolean} isPublic Whether this rampart should be public or non-public.
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
     * </table>
     */
    setPublic(isPublic: boolean): number,
}