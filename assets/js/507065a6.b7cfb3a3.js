"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[399],{6721:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=a(7462),o=(a(7294),a(3905)),l=a(6340);const i={},r="Day 15: Chiton",s={unversionedId:"puzzles/day15",id:"puzzles/day15",title:"Day 15: Chiton",description:"By @anatoliykmetyuk",source:"@site/target/mdoc/puzzles/day15.md",sourceDirName:"puzzles",slug:"/puzzles/day15",permalink:"/scala-advent-of-code/puzzles/day15",draft:!1,editUrl:"https://github.com/scalacenter/scala-advent-of-code/edit/website/docs/puzzles/day15.md",tags:[],version:"current",frontMatter:{},sidebar:"adventOfCodeSidebar",previous:{title:"Day 14: Extended Polymerization",permalink:"/scala-advent-of-code/puzzles/day14"},next:{title:"Day 16: Packet Decoder",permalink:"/scala-advent-of-code/puzzles/day16"}},d={},p=[{value:"Puzzle description",id:"puzzle-description",level:2},{value:"Problem",id:"problem",level:2},{value:"Domain Model",id:"domain-model",level:2},{value:"Algorithm \u2013 Part 1",id:"algorithm--part-1",level:2},{value:"Part 2",id:"part-2",level:2},{value:"Solutions from the community",id:"solutions-from-the-community",level:2}],u={toc:p};function c(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"day-15-chiton"},"Day 15: Chiton"),(0,o.kt)("p",null,"By @anatoliykmetyuk"),(0,o.kt)("h2",{id:"puzzle-description"},"Puzzle description"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://adventofcode.com/2021/day/15"},"https://adventofcode.com/2021/day/15")),(0,o.kt)("h2",{id:"problem"},"Problem"),(0,o.kt)("p",null,"The problem in its essence is that of finding the least-costly path through a graph. This problem is solved by Dijkstra's algorithm, nicely explained in this ",(0,o.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=GazC3A4OQTE"},"Computerphile video"),"."),(0,o.kt)("h2",{id:"domain-model"},"Domain Model"),(0,o.kt)("p",null,"The two domain entities we are working with are the game map and an individual cell of that map. In presence of the game map, a cell is fully described by a pair of its coordinates."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"type Coord = (Int, Int)\n")),(0,o.kt)("p",null,"The game map contains all the cells from the challenge input. It also defines the neighbours of a given cell, which we need to know for Dijkstra's algorithm. Finally, it defines a function to get the cost of entering a given cell."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"class GameMap(cells: IndexedSeq[IndexedSeq[Int]]):\n  val maxRow = cells.length - 1\n  val maxCol = cells.head.length - 1\n\n  def neighboursOf(c: Coord): List[Coord] =\n    val (row, col) = c\n    val lb = mutable.ListBuffer.empty[Coord]\n    if row < maxRow then lb.append((row+1, col))\n    if row > 0      then lb.append((row-1, col))\n    if col < maxCol then lb.append((row, col+1))\n    if col > 0      then lb.append((row, col-1))\n    lb.toList\n\n  def costOf(c: Coord): Int = c match\n    case (row, col) => cells(row)(col)\nend GameMap\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"IndexedSeq")," in the ",(0,o.kt)("inlineCode",{parentName:"p"},"cells")," type is important for this algorithm since we are doing a lot of index-based accesses, so we need to use a data structure optimized for that."),(0,o.kt)("h2",{id:"algorithm--part-1"},"Algorithm \u2013 Part 1"),(0,o.kt)("p",null,"We start the solution by defining three data structures for the algorithm:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"val visited = mutable.Set.empty[Coord]\nval dist = mutable.Map[Coord, Int]((0, 0) -> 0)\nval queue = java.util.PriorityQueue[Coord](Ordering.by(dist))\nqueue.add((0, 0))\n")),(0,o.kt)("p",null,"The first one is a ",(0,o.kt)("inlineCode",{parentName:"p"},"Set")," of all visited nodes \u2013 the ones the algorithm will not look at again. The second one is a ",(0,o.kt)("inlineCode",{parentName:"p"},"Map")," of distances containing the smallest currently known distance from the top-left corner of the map to the given cell. Finally, the third one is a ",(0,o.kt)("inlineCode",{parentName:"p"},"java.util.PriorityQueue")," that defines in which order to examine cells. We are using Java's ",(0,o.kt)("inlineCode",{parentName:"p"},"PriorityQueue"),", not the Scala's one since the Java ",(0,o.kt)("inlineCode",{parentName:"p"},"PriorityQueue")," implementation defines the ",(0,o.kt)("inlineCode",{parentName:"p"},"remove")," operation on the queue which is necessary for efficient implementation and which the Scala queue lacks."),(0,o.kt)("p",null,"We also initialize the queue with the first node we are going to examine \u2013 the top-left corner of the map."),(0,o.kt)("p",null,"Once we have the data structures, there's a loop which runs Dijkstra's algorithm on those structures:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"while queue.peek() != null do\n  val c = queue.poll()\n  visited += c\n  val newNodes: List[Coord] = gameMap.neighboursOf(c).filterNot(visited)\n  val cDist = dist(c)\n  for n <- newNodes do\n    val newDist = cDist + gameMap.costOf(n)\n    if !dist.contains(n) || dist(n) > newDist then\n      dist(n) = newDist\n      queue.remove(n)\n      queue.add(n)\ndist((gameMap.maxRow, gameMap.maxCol))\n")),(0,o.kt)("p",null,"We use ",(0,o.kt)("inlineCode",{parentName:"p"},"queue.remove(n)")," followed by ",(0,o.kt)("inlineCode",{parentName:"p"},"queue.add(n)")," here \u2013 this is to recompute the position of ",(0,o.kt)("inlineCode",{parentName:"p"},"n")," in the queue following the change in the ordering of the queue (that is, the mutation of ",(0,o.kt)("inlineCode",{parentName:"p"},"dist"),"). Ideally, you would need a ",(0,o.kt)("a",{parentName:"p",href:"https://www.baeldung.com/cs/min-heaps-decrease-key"},"decreaseKey")," operation on the priority queue for the best performance \u2013 but that would require writing a dedicated data structure, which is out of scope for this solution."),(0,o.kt)(l.Z,{puzzle:"day15-part1",year:"2021",mdxType:"Solver"}),(0,o.kt)("h2",{id:"part-2"},"Part 2"),(0,o.kt)("p",null,"Part 2 is like Part 1 but 25 times larger. The Part 1 algorithm is capable of dealing with scale, and so the only challenge is to construct the game map for part 2."),(0,o.kt)("p",null,"We generate the Part 2 game map from the Part 1 map using three nested loops:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"val seedTile = readInput()\nval gameMap = GameMap(\n  (0 until 5).flatMap { tileIdVertical =>\n    for row <- seedTile yield\n      for\n        tileIdHorizontal <- 0 until 5\n        cell <- row\n      yield (cell + tileIdHorizontal + tileIdVertical - 1) % 9 + 1\n  }\n)\n")),(0,o.kt)("p",null,"The innermost loop generates individual cells according to the challenge spec. The second-level loop pads the 100x100 tiles of the map horizontally, starting from the ",(0,o.kt)("inlineCode",{parentName:"p"},"seedTile")," (the one used in Part 1). Finally, the outermost loop pads the tiles vertically."),(0,o.kt)(l.Z,{puzzle:"day15-part2",year:"2021",mdxType:"Solver"}),(0,o.kt)("h2",{id:"solutions-from-the-community"},"Solutions from the community"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Jannyboy11/AdventOfCode2021/blob/main/src/main/scala/day15/Day15.scala"},"Solution")," of ",(0,o.kt)("a",{parentName:"li",href:"https://twitter.com/JanBoerman95"},"Jan Boerman"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/FlorianCassayre/AdventOfCode-2021/blob/master/src/main/scala/adventofcode/solutions/Day15.scala"},"Solution")," of ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/FlorianCassayre"},"@FlorianCassayre"),".")),(0,o.kt)("p",null,"Share your solution to the Scala community by editing this page."))}c.isMDXComponent=!0}}]);