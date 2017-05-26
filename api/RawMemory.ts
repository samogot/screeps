/**
 * RawMemory object allows to implement your own memory stringifier instead of built-in serializer
 * based on <code>JSON.stringify</code>. It also allows to request up to 10 MB of additional memory
 * using asynchronous memory segments feature.
 *
 * You can also access memory segments of other players using methods below.
 */
const RawMemory: RawMemory;

/**
 * RawMemory object allows to implement your own memory stringifier instead of built-in serializer
 * based on <code>JSON.stringify</code>. It also allows to request up to 10 MB of additional memory
 * using asynchronous memory segments feature.
 *
 * You can also access memory segments of other players using methods below.
 */
interface RawMemory {
    /**
	 * An object with asynchronous memory segments available on this tick. Each object key is the segment ID with data in string values. Use {@link RawMemory.setActiveSegments setActiveSegments`}</code> to fetch segments on the next tick. Segments data is saved automatically in the end of the tick.
     *
     * @example
     * RawMemory.setActiveSegments([0,3]);
     * // on the next tick
     * console.log(RawMemory.segments[0]);
     * console.log(RawMemory.segments[3]);
     * RawMemory.segments[3] = '{"foo": "bar", "counter": 15}';
     */
    segments: { [id: number]: string },

	/**
	 * An object with a memory segment of another player available on this tick. Use {@link RawMemory.setActiveForeignSegment setActiveForeignSegment`} to fetch segments on the next tick.
	 * The object consists of the following properties:
	 *
	 * @example
	 * RawMemory.setActiveForeignSegment('player');
	 * // on the next tick
	 * console.log(RawMemory.foreignSegment);
	 * // --> {"username": "player", "id": 40, "data": "Hello!"}
	 */
	foreignSegment: {

		/**
		 * Another player's name.
		 */
		username: string,

		/**
		 * The ID of the requested memory segment.
		 */
		id: number,

		/**
		 * The segment contents.
		 */
		data: string,
	},

    /**
     * Get a raw string representation of the <code>Memory</code> object.
     *
     * This method has insignificant CPU cost.
     *
     * @return {string} Returns a string value.
     *
     * @example
     * const myMemory = JSON.parse(RawMemory.get());
     */
    get(): string,

    /**
     * Set new <code>Memory</code> value.
     *
     * This method has insignificant CPU cost.
     *
     * @param {string} value New memory value as a string.
     *
     * @example
     * RawMemory.set(JSON.stringify(myMemory));
     */
    set(value: string): void,

    /**
	 * Request memory segments using the list of their IDs. Memory segments will become available on the next tick in {@link RawMemory.segments segments`}</code> object.
     *
     * This method has insignificant CPU cost.
     *
     * @param {number[]} ids An array of segment IDs. Each ID should be a number from 0 to 99. Maximum 10 segments can be active at the same time. Subsequent calls of <code>setActiveSegments</code> override previous ones.
     *
     * @example
     * RawMemory.setActiveSegments([0,3]);
     */
    setActiveSegments(ids: number[]),

	/**
	 * Request a memory segment of another user. The segment should be marked by its owner as public using {@link RawMemory.setPublicSegments setPublicSegments`}.
	 * The segment data will become available on the next tick in {@link RawMemory.foreignSegment foreignSegment`} object.
	 * You can only have access to one foreign segment at the same time.
	 *
	 * This method has insignificant CPU cost.
	 *
	 * @param {string | null} username The name of another user. Pass <code>null</code> to clear the foreign segment.
	 * @param {number} id (optional) The ID of the requested segment from 0 to 99. If undefined, the user's default public segment is requested as set by {@link RawMemory.setDefaultPublicSegment setDefaultPublicSegment}.
	 *
	 * @example
	 * RawMemory.setActiveForeignSegment('player');
	 *
	 * @example
	 * RawMemory.setActiveForeignSegment('player', 10);
	 *
	 * @example
	 * RawMemory.setActiveForeignSegment(null);
	 */
	setActiveForeignSegment(username: string | null, id?: number),

	/**
	 * Set the specified segment as your default public segment. It will be returned if no <code>id</code> parameter is passed to {@link RawMemory.setActiveForeignSegment setActiveForeignSegment`} by another user.
	 *
	 * This method has insignificant CPU cost.
	 *
	 * @param {number | null} id The ID of the memory segment from 0 to 99. Pass <code>null</code> to remove your default public segment.
	 *
	 * @example
	 * RawMemory.setPublicSegments([5,20,21]);
	 * RawMemory.setDefaultPublicSegment(5);
	 *
	 * @example
	 * RawMemory.setDefaultPublicSegment(null);
	 */
	setDefaultPublicSegment(id: number | null),

	/**
	 * Set specified segments as public. Other users will be able to request access to them using {@link RawMemory.setActiveForeignSegment setActiveForeignSegment`}.
	 *
	 * This method has insignificant CPU cost.
	 *
	 * @param {number[]} ids An array of segment IDs. Each ID should be a number from 0 to 99. Subsequent calls of <code>setPublicSegments</code> override previous ones.
	 *
	 * @example
	 * RawMemory.setPublicSegments([5,3]);
	 *
	 * @example
	 * RawMemory.setPublicSegments([]);
	 */
	setPublicSegments(ids: number[]),
}