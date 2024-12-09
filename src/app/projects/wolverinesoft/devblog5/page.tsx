import styles from "@/app/projects/wolverinesoft/page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Devblog 4: November 10th - November 24th </h1>

      <hr />

      <h2>Week 1</h2>

      <h3>Studio Meeting 1 (November 24th): (0 hours)</h3>
      <p>
        I was unable to attend this meeting due to a conflict in scheduling.
      </p>

      <h3>Sprite Rendering Order (3 hours)</h3>
      <p>
        Me and Ishita continued to work on the sprite rendering order.
        Although I was unable to attend the studio meeting, I was able to review some material from the meeting and get a good idea of what needed to be done, and some potential changes.
        I made a few initial changes, particularly addressing bugs from previous attempts.
      </p>

      <h2>Week 2</h2>

      <h3>Studio Meeting 2 (December 1st): (0 hours)</h3>

      <p>
        I did not attend this meeting either, although it was optional due to the Thanksgiving break.
      </p>

      <h3>Wall Bug Brainstorming (0.5 hours)</h3>

      <p>
        Connor informed us of two relatively minor bugs with how the current wall placement was working.
        Since I was out of town for all of Thanksgiving, I did not have much time to work on this, but I did spend a little bit of time brainstorming potential solutions.
        Thankfully, Ishita was able to finish this task up and resolve the bugs.
      </p>

      <h3>Studio Meeting 3 (December 8th): (2 hours)</h3>

      <p>
        In this (final) studio meeting before the game demo, I spent the entire time playtesting.
        This took a little while to figure out since there were a few minor issues.
        In doing so, me and Ishita found a few minor bugs.
        Since we were running out of time, we decided to look into some of the more important bugs, but for the most part leaving the rest for after the demo.
      </p>

      <h3>Continued Bug Exploration (0.5 hours)</h3>

      <p>
        The bugs we found were relatively minor, but also difficult to understand.
        In particular I spent a while trying to figure out why the gate was rendering slightly off of where it was intended to.
        Although I spent some time working on this after the meeting, I was unable to find a solution before the demo.
      </p>


      <h2>Summary of Hours</h2>
      <ul>
        <li>Studio Meeting 1: 2 hours</li>
        <li>Wall Preview Fix: 1 hour</li>
        <li>Wall Placement Speedup: 0.5 hours</li>
        <li>Art Implementation: 2 hours</li>
        <li>Studio Meeting 2: 2 hours</li>
        <li>Sprite Rendering Order: 2 hours</li>
      </ul>

      <p>
        <strong>Total Hours Spent:</strong> 9.5 hours
      </p>

      <p>
        This was a successful two weeks, and we managed to make some good progress on the wall system, finally completing it.
        Since this semester is coming to a close soon, I imagine the sprite rendering order will be the last major task we work on.
        We make some good initial progress on this task, and we will likely be focused on optimizing it in the coming weeks.
      </p>
    </div>
  );
}
