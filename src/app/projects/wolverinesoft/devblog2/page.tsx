import styles from "@/app/projects/wolverinesoft/page.module.css";
import Image from "next/image";
import coc from "./coc.webp";
import code from "./code.png";
import image from "./image.png";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Devblog 2: October 13th - October 27th</h1>

      <hr />

      <h2>Week 1</h2>
      <p>
        <strong>Studio Meeting 1 (October 13th):</strong>
        <br />
        This meeting was skipped due to fall break.
      </p>

      <h3>Bug Fixes & Miscellaneous Changes: (4 hours)</h3>
      <p>
        At the end of the previous week, I managed to get a working system for
        grid snapping walls in place. However, there were a leftover few bugs
        (and other miscellaneous changes) that still needed to be fixed. For the
        first week of this sprint, I focused on fixing these issues.
      </p>
      <p>
        To begin, I first added back temporary placeholder side towers (since I
        had removed the towers last week). I made a few changes for these new
        towers to work with the previous snapping, and then went through and
        adjusted wall lengths to conform better to the new grid layout.
      </p>

      <Image src={image.src} alt="Wall System" width={600} height={300} />

      <p>
        Then I fixed a previous issue where walls would not place to their full
        length, mainly due to changes in how we calculate lengths with our new
        grid layout. Finally, I centered each of the wall segments to their own
        grid square.
      </p>

      <h3>Resource Cost Enforcement: (2.5 hours)</h3>

      <p>
        Later this week, I also implemented stricter resource cost enforcement,
        disallowing the player to build any walls that they couldn&#39;t afford.
        Although there was some semblance of this feature previously, it only
        prevented certain segments of the wall being built, but it would still
        allow the construction to begin. After my changes, I developed a system
        that would change the color of the wall placement preview to red if
        there were insufficient resources, and if the player tried to place the
        wall, it would cancel the placement.
      </p>

      <h2>Week 2</h2>
      <p>
        <strong>Studio Meeting 2 (October 20th):</strong> (2 hours) <br />
        Making initial progress on the walls, we discussed ways to should
        proceed with the wall system. In particular, we discussed a few ideas
        for converting the walls to 2D. One such idea was inspired by Clash of
        Clans, where we use a diagonal grid in order to have consistent wall
        textures (regardless of orientation).
      </p>

      <Image src={coc.src} alt="Clash of Clans" width={350} height={300} />

      <p>
        Another idea we considered was to have side towers upgradable, although
        we decided to leave them as placeholders for the time being.
      </p>

      <h3>Rotated Grid Layout (3 hours)</h3>

      <p>
        I started this week&#39;s work by implementing a rotated grid layout.
        This was relatively simple at first, since I just had to adjust the
        SnapToGrid function I wrote in the previous sprint.
      </p>

      <Image src={code.src} alt="Code" width={300} height={450} />

      <h3>Wall Placement Direction (3 hours)</h3>

      <p>
        The harder part was forcing the walls to specific directions. In
        particular, we limited the direction of wall placements to 45 degrees,
        135 degrees, 225 degrees, and 315 degrees. Ishita made some preliminary
        progress on this, but there were a few leftover issues I had to resolve.
        In the end, this was implemented by finding the nearest angle from the
        starting (snapped) position to the mouse cursor, and then extending the
        wall by the magnitude of the distance between the two points.
      </p>

      <p>
        The current implementation also only snapped the grid preview, but
        failed the build the actual wall in the correct location. This, though,
        was a minor issue that I was able to fix relatively quickly.
      </p>

      <p>
        Ishita already made some progress in coverting the walls to 2D as well,
        so I experimented further with this, but was unable to decide on a
        particular system before the weekly meeting.
      </p>

      <h2>Summary of Hours</h2>
      <ul>
        <li>Studio Meeting 1: 0 hours</li>
        <li>Bug Fixes & Miscellaneous Changes: 4 hours</li>
        <li>Resource Cost Enforcement: 2.5 hours</li>
        <li>Studio Meeting 2: 2 hours</li>
        <li>Rotated Grid Layout: 3 hours</li>
        <li>Wall Placement Direction: 3 hours</li>
      </ul>

      <p>
        <strong>Total Hours Spent:</strong> 14.5 hours
      </p>

      <p>
        In all, this was a very successful two weeks. We managed to make
        some good progress on the wall system, and I was able to fix a few
        lingering bugs from the previous sprint. We also discussed a few ideas
        for the future of the wall system, and I was able to implement a few of
        them. I&#39;m looking forward to seeing how the wall system progresses in
        the future.
      </p>
    </div>
  );
}
