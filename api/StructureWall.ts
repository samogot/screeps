/**
 * Blocks movement of all creeps.
 *
 * <table class="table gameplay-info">
 *
 *     <tr>
 *         <td><b>Controller level</b></td>
 *         <td>2</td>
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
 *         <td><b>Max hits</b></td>
 *         <td>300,000,000</td>
 *     </tr>
 *
 * </table>
 */
interface StructureWall extends Structure {
    /**
     * The amount of game ticks when the wall will disappear (only for automatically placed border walls at the start of the game).
     */
    ticksToLive?: number,
}