// News section content. Data only — app/page.js wires this into <News/>, and
// app/news/[slug]/page.js renders each article via getArticle().
// Consumers: app/page.js, app/news/[slug]/page.js
//
// Mirrors the source's NewsFeaturedSlice (home band: one highlighted article +
// compact rows) and NewsArticleContent (article page: sticky summary/share on
// the left, rich-text body on the right). Placeholder copy + /images/news-*.svg
// assets — swap for a real newsroom feed later without touching the components.
//
// Article body model (per `body`):
//   lead        — the larger opening paragraph (source `.lead`)
//   paragraphs  — each entry is either a string (plain <p>) OR an array of
//                 segments, where a string is text and { text, href } is an
//                 inline link. Mirrors the source's occasional inline links.
//   Bodies run long (lead + ~8 paragraphs) so the article column is taller than
//   the sticky left info column — the pinned-left / scrolling-right behavior
//   only shows when the body outruns the sidebar.

export const news = {
  heading: "News",
  featured: {
    slug: "relai-series-b",
    date: "08/05/2025",
    title: "Relai closes its Series B",
    description:
      "New capital accelerates Relai's rollout across major U.S. ports — bringing vessel, terminal, yard, and truck onto a single real-time system.",
    href: "/news/relai-series-b",
    image: {
      src: "/images/news-featured.svg",
      alt: "Stacked shipping containers lit at a port terminal at dusk.",
      aspectRatio: "3/2",
    },
    body: {
      lead:
        "Relai has raised a Series B to accelerate the rollout of its freight coordination layer across major U.S. ports — bringing vessel, terminal, yard, and truck onto a single real-time system.",
      paragraphs: [
        "The round will fund deeper integrations with terminal operating systems and carrier networks, expand the engineering and deployment teams, and bring the platform to new gateways on both coasts. Relai's thesis is simple: the freight supply chain loses time and money not because any single system is broken, but because the systems don't talk to each other.",
        [
          "The raise follows a year of live deployments, including a ",
          {
            text: "first end-to-end real-time handoff pilot",
            href: "/news/relai-realtime-handoff-pilot",
          },
          " with a leading carrier and measurable reductions in idle time at partner terminals.",
        ],
        "For most of the last decade, the industry's answer to poor coordination was more software — a portal for the terminal, a portal for the carrier, a portal for the drayage provider, each a walled garden with its own login and its own version of the truth. The result was not less friction but more: operators spending their days re-keying data between systems that were never designed to agree with one another. Relai was founded on the opposite premise — that the value is not in another system of record, but in the connective layer between the ones that already exist.",
        "That premise is now holding up in the field. Across its first deployments, Relai has shown that when every party in a port call sees the same live picture — where a vessel is, when a box will be discharged, which truck is assigned to it, and whether the gate appointment still holds — the moves that used to stall simply flow. The Series B is, in effect, capital to turn that proof into shared infrastructure.",
        "The new funding goes first toward integration depth. Every terminal runs a different operating system, every carrier exposes a different interface, and every drayage network carries its own conventions; meeting each of them where they are is painstaking work that does not reward shortcuts. Relai is growing the team responsible for that groundwork so that bringing a new gateway online takes weeks rather than quarters.",
        "A second priority is reliability at scale. A coordination layer is only as trusted as its worst day, and freight does not pause for maintenance windows. Part of the raise is earmarked for the observability, redundancy, and support functions required to run the platform as critical infrastructure — the kind an operations team can build a shift around without keeping a fallback spreadsheet open in the next tab.",
        [
          "The company will also invest in the analytics that turn coordination into measurable outcomes. Early sites have already recorded ",
          {
            text: "reductions in idle time and emissions",
            href: "/news/relai-cuts-idle-emissions",
          },
          "; the next step is making those results legible and repeatable, so a terminal can point to exactly where the hours and the fuel were saved and reproduce it across every lane.",
        ],
        "New capital lets Relai move from proving the model at individual sites to operating it as shared infrastructure — a coordination layer that every party in a port call can read from and write to in real time. The company is hiring across engineering, deployment, and operations as it scales, and remains focused on the goal it started with: giving the supply chain the visibility and control to move faster, and cleaner.",
      ],
    },
  },
  items: [
    {
      slug: "pacific-gateway-selects-relai",
      date: "06/20/2025",
      title: "Pacific Gateway Lines selects Relai",
      href: "/news/pacific-gateway-selects-relai",
      image: {
        src: "/images/news-pacific-gateway.svg",
        alt: "Freight trucks staged along a container yard.",
        aspectRatio: "16/9",
      },
      body: {
        lead:
          "Pacific Gateway Lines has selected Relai to orchestrate terminal and drayage operations across its West Coast footprint, unifying vessel, yard, and truck coordination on a single real-time platform.",
        paragraphs: [
          "Under the agreement, Relai will connect Pacific Gateway's terminal operating system, appointment system, and drayage partners so that every container move is visible — and actionable — from one interface. The goal is to replace the phone calls, spreadsheets, and disconnected portals that today sit between a vessel's arrival and a truck leaving the gate.",
          "Pacific Gateway handles a mix of import, export, and transshipment volume across several terminals, and like most operators of its size it has accumulated a stack of point solutions over the years — each competent in isolation, none aware of the others. On a busy day, reconciling those systems is a full-time job in itself, and the cost of a missed handoff is measured not in minutes but in wasted appointments and stranded equipment.",
          "“We chose Relai because it meets us where our operation actually is,” said a Pacific Gateway operations lead. “It doesn't ask us to rip out the systems we rely on — it coordinates them. For the first time, the terminal desk and the drayage dispatcher are working from the same live picture instead of trading phone calls to find out what already happened.”",
          "The rollout will begin with terminal orchestration: giving planners a single view of vessel schedules, yard positions, and appointment availability so that work can be sequenced against reality rather than a plan drawn up the night before. As that foundation stabilizes, Relai will extend coordination outward to the drayage layer, where the handoff between terminal and trucker is historically the most fragile link in the chain.",
          [
            "The approach builds directly on the coordination model Relai has been proving across its ",
            {
              text: "first port deployments",
              href: "/news/relai-cuts-idle-emissions",
            },
            ", where connecting terminal and drayage in real time cut idle time and emissions. Pacific Gateway expects similar gains as trucks stop queuing for containers that aren't ready and start arriving against moves that are.",
          ],
          "Integration work is already underway, with Relai's deployment team embedding alongside Pacific Gateway's operations staff rather than handing over software and walking away. That model — deploy in the field, tune against the real workflow, and only then expand — has been central to how Relai onboards each new site, and it is how the two teams intend to de-risk a rollout across multiple terminals.",
          "For Pacific Gateway, the wager is less about any single feature than about a change in posture: moving from reacting to problems after they surface to seeing them early enough to prevent them. A container that is running late is no longer a surprise discovered at the gate; it is a signal the whole network can plan around hours in advance.",
          "Deployment begins this quarter, starting with terminal orchestration and expanding to drayage handoff as integrations come online. Both companies expect the first measurable results — shorter gate turns, fewer missed appointments, and less idling — within the first full quarter of operation.",
        ],
      },
    },
    {
      slug: "relai-cuts-idle-emissions",
      date: "05/28/2025",
      title: "Relai cuts idle time and emissions",
      href: "/news/relai-cuts-idle-emissions",
      image: {
        src: "/images/news-idle-emissions.svg",
        alt: "Aerial view of a working port at golden hour.",
        aspectRatio: "3/2",
      },
      body: {
        lead:
          "Across its first port deployments, Relai has measurably cut idle time and emissions by coordinating vessel, terminal, yard, and truck on a single real-time system.",
        paragraphs: [
          "Idle time is the freight supply chain's quietest cost. Trucks wait for containers that aren't ready; containers wait for trucks that aren't scheduled; and every hour of waiting burns fuel and capacity. By giving each party a shared, real-time view of what's happening next, Relai lets moves be sequenced instead of stalled.",
          "The problem has always been less about any single delay than about the compounding of many small ones. A vessel discharges an hour behind schedule; the yard re-plans; the appointment no longer matches the work; the trucker arrives to a box that isn't staged; and by the end of the day the queue at the gate is an hour long and nobody can say exactly why. Each link acted rationally on the information it had — the information was simply out of date the moment it was shared.",
          "Relai attacks that decay at the source. Rather than passing status between systems in batches — an email here, a portal refresh there — it maintains one live picture that every party reads from and writes to continuously. When a vessel's discharge slips, the yard plan, the appointment, and the trucker's assignment all see the change at once, and the network re-sequences before the delay has a chance to compound.",
          "Early results from partner terminals show meaningful reductions in gate turn times and truck idling, with a corresponding drop in emissions from engines that would otherwise be running in a queue. The emissions savings are not a separate initiative bolted onto the platform; they are a direct consequence of fewer trucks spending fewer hours idling for containers that weren't ready.",
          "The effect is most visible at the drayage handoff, historically the least coordinated link in the chain. When a driver knows before leaving the yard that a container is staged and the appointment holds, the trip is a single clean move instead of a speculative run that ends in a wait. Multiplied across thousands of moves a week, the difference in fuel, hours, and driver frustration is substantial.",
          [
            "The deployments follow the real-time coordination approach Relai validated in its ",
            {
              text: "end-to-end handoff pilot",
              href: "/news/relai-realtime-handoff-pilot",
            },
            " with a leading carrier, which tracked a single container across every stage of a port call on one live timeline. What began as a controlled test has become the default way these sites now operate.",
          ],
          "Operators have also found that the same data that reduces idling makes the environmental gains easy to prove. Because every move is timestamped on a shared record, a terminal can point to exactly how many idling-hours were avoided and translate them into fuel and emissions saved — turning a soft sustainability claim into a number that stands up to scrutiny.",
          "Relai is now extending the same instrumentation to additional gateways, turning idle-time reduction from a one-site result into a repeatable outcome. That expansion leans on deeper integration work and the analytics that make the savings legible across every lane — so each new site can point to exactly where the hours and the fuel were saved.",
        ],
      },
    },
    {
      slug: "relai-realtime-handoff-pilot",
      date: "04/16/2025",
      title: "Relai completes first real-time handoff pilot",
      href: "/news/relai-realtime-handoff-pilot",
      image: {
        src: "/images/news-realtime-pilot.svg",
        alt: "Real-time logistics dashboard tracking containers across a network.",
        aspectRatio: "2.6/1",
      },
      body: {
        lead:
          "Relai and a leading carrier have completed a first end-to-end real-time handoff pilot, tracking a container across vessel, terminal, yard, and truck on a single live system.",
        paragraphs: [
          "The pilot instrumented a full port call from arrival to gate-out, replacing the usual patchwork of status emails and portal checks with one shared timeline that every party could see and act on. When a container's status changed, everyone downstream knew immediately — no polling, no phone tag.",
          "The handoff between terminal and drayage is the point where visibility has traditionally gone dark. The terminal knows when a box is discharged and staged; the trucker knows when they can send a driver; but the two facts rarely meet in time. The pilot was designed to close that gap directly — to make the moment a container becomes available and the moment a driver is dispatched two ends of the same event rather than two disconnected systems guessing about each other.",
          "In practice, that meant wiring the terminal's operating system, the yard's position data, the appointment system, and the carrier's dispatch onto a single record. Each party kept the tools it already used; Relai sat between them, keeping the picture current and pushing changes the instant they happened. A slip in discharge no longer traveled by email an hour later — it propagated to the dispatcher and the driver in real time.",
          "The result was a cleaner handoff between terminal and drayage, with fewer missed appointments and less time spent reconciling where a container actually was. Drivers arrived against work that was genuinely ready, gate transactions went faster, and the day's plan held together longer because it was continuously corrected instead of set once and overtaken by events.",
          "Just as important as the operational numbers was what the participants stopped doing. The dispatcher spent less of the day on the phone chasing status; the terminal desk fielded fewer calls asking where a box was; and the exceptions that did occur surfaced early enough to be managed rather than absorbed. Coordination that had lived in people's heads and inboxes moved onto a shared system that never lost the thread.",
          "The pilot also produced the first clear evidence of the downstream benefits Relai expects at scale — the reductions in idle time and emissions that come from trucks no longer queuing for containers that aren't ready. What the pilot proved in a controlled setting is the pattern the company now aims to repeat across every deployment.",
          "More than a proof of concept, the pilot is the foundation for the broader coordination layer Relai is now scaling. The mechanics validated over a single port call — one live record, every party reading and writing to it — are precisely the mechanics the platform is built to run across whole gateways.",
          "Relai and the carrier plan to expand the pilot to additional lanes and terminals, using the real-time handoff as the template for how freight moves should be coordinated. For both, the goal is no longer to demonstrate that the model works, but to make it the ordinary way a port call runs.",
        ],
      },
    },
  ],
};

// Flat list of every article (featured + rows), in display order. The single
// source of truth for the [slug] route — add an article to `news` above and it
// gets a page, static param, and metadata automatically.
export const articles = [news.featured, ...news.items];

export const articleSlugs = articles.map((article) => article.slug);

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug) || null;
}
