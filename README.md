### Purpose ###
*A do nothing demo/learning app to show that I can write all the codez.*  

Jokes aside, I wanted to build something to apply some of my lessons from the [React for Beginners](https://goo.gl/4hT3DU) course. Ultimately users should be able to successfully perform CRUD actions. The app uses [Alt's](http://alt.js.org/) Flux implementation (yes I know all the cool kids use Redux) and persists state across reloads with localStorage.  

### How to use ###
![How to use.](http://g.recordit.co/OW5WhVvfgi.gif)    
- Visit: http://clumsy-year.surge.sh/
- Enter instructions or use the Demo button.  
- Click "Instruct".  
- To validate app functionality, read the extract below to come up with valid instructions. Manually trace your instructions on along the grid to determine the final position and output. Insert these instructions into the app and test the output against your manual output.  
- Or try the CLI version: https://github.com/komplexb/martian-robots

## About ##

### The Problem ###
The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.  

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west). For martians add an 'M' after the orientation.
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the
instructions:  
- Left : the robot turns left 90 degrees and remains on the current grid point.  
- Right : the robot turns right 90 degrees and remains on the current grid point.  
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.  

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).
There is also a possibility that additional command types maybe required in the future and
provision should be made for this.  

Since the grid is rectangular and bounded (…yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.  

Martians do not have the same limitations as robots; they can go off the grid, i.e. not get lost. You can test this by instructing a martian to go beyond the location of a lost robot.   

### The Input ###
The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.  

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.  

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.  

The maximum value for any coordinate is 50.  

All instruction strings will be less than 100 characters in length.

### The Output ###
For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.  

#### Sample Input ####
Input creates a robot by default. Adding an 'M' after the orientation creates a martian instead. For example: _3 2 N M_.

5 3  
1 1 E  
RFRFRFRF  

3 2 N  
FRRFLLFFRRFLL  

0 3 W  
LLFFFLFLFL  

3 2 N M  
FRRFLLFFRRFLLFFF  

#### Sample Output ####
- 1 1 E => 🤖 1 1 ➡️
- 3 3 N LOST => 🤖 3 3 ⬆️ 🆘
- 2 3 S => 🤖 2 3 ⬇️
- 3 6 N => 👾 3 6 ⬆️

## ToDo
- Make existing functional tests work in `create-react-app` project structure
- Write UI tests
- CSS Modules
