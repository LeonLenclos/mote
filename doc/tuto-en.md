### Table of Contents

- [0- Introduction](#0--introduction)
- [1- Getting started](#1--getting-started)
- [2- Using the editor](#2--using-the-editor)
- [3- Advanced concepts](#3--advanced-conceps)
- [4- Ressources](#4--ressources)

# 0- Introduction


This tutorial will guide you step by step in the use of mote.

## What is mote?

mote is a [game engine](https://en.wikipedia.org/wiki/Game_engine) in [text mode](http://polyducks.co.uk/what-is-textmode/).

To create a game with mote, we write the game code in a special language that we will describe here. This language is based on [XML](https://developer.mozilla.org/en/docs/Web/XML/XML_introduction).


## The editor

The editor is currently located at this address: [leonlenclos.github.io/mote](https://leonlenclos.github.io/mote)

The editor has three modes that are accessible by clicking on the buttons in the top bar:

- **code** : the place where you code your game
- **test** : the place where you test your game
- **export** : the place where you export your game

# 1- Getting started

From now on, each chapter will be a commented example.

Please take the time to try the examples on [the editor](https://leonlenclos.github.io/mote) :

1. In the tutorial, Copy the example code by pressing the *copy* button above each example (<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>)
1. In the editor, switch to **code** mode and paste the code from the example.
2. Switch to **test** mode and try the game.
3. Try to make changes in the code and alternate between **code** and **test**.


### My first game

```xml
<game>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</game>
```

Here is a simple example of a game created with **mote**: The player is a `@` and he must reach the `?` without touching the `^`. To play, we use the arrow keys on the keyboard.

Notice that the code starts and ends with tags: `<game>` at the beginning and `</game>` at the end. The code of a game must *always* be enclosed by these tags. Between the two tags there is the **definition** of the game: the game is simply written as it will appear at the beginning of the game.

### The levels

My game is a bit too easy, let's add some difficulty.

```xml
<game>
<level>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<level>




  @                      ?
--------            ---------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
</game>
```

This game has two levels. If you manage to reach the `?` you pass to the next level, if you hit a `^` you start again.

The levels are framed by the tags `<level>` and `</level>`. The code of our game is a `<game> </game>` which contains several `<level> </level>` which each contain the definition of the level.


### The screens

It's a bit strange to see the game freeze at the end, how about a congratulations screen instead.


```xml
<game>
<level>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<level>




  @                      ?
--------            ---------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<screen>




          BRAVO !            



</screen>
</game>
```

The `<screen>` tag works like the `<level>` tag the only difference is that its content is not playable. Here, the screen is the last element of the game, but screens can be placed anywhere in the game, you can then skip them by pressing any key.

### A title

Time to give the game a title and finally get rid of that *untitled*.

```xml
<game
title="the ravine"
>
<level>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<level>




  @                      ?
--------            ---------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<screen>




          BRAVO !            



</screen>
</game>
```

We just learned about a new mote concept, the **rules**.

We have added a rule. The name of this rule is `title`, the value of the rule is `the ravine`.

We can specify an empty title with `title=""`, in which case no title will be displayed.

Let's analyze this new syntax : The rule is written inside the opening tag `<game>`, more precisely between the `<game` and the `>`. Between the name and the value of the rule, there is a `=` sign. We don't put quotation marks around the rule name, but we do put quotation marks around the value.

### Character rules

Tired of `@`, `?` and `^`, let's change characters!

```xml
<game
title="the ravine"
player="?"
goal="X"
deadly="\/|"
>
<level>




    ?                   X
------------    -------------

/||\\/|//|\\|||\\//|/\\|//|//
</level>
<level>




  ?                      X
--------            ---------

/||\\/|//|\\|||\\//|/\\|//|//
</level>
<screen>




          BRAVO !            



</screen>
</game>
```

`title` is not the only rule that can be set, there are actually a bunch! Here we are interested in the character rules that are used to define which character represents each element of the game:

- the `player` rule for characters that represent the player.
- the `goal` rule for characters that represent the goal.
- the `deadly` rule for characters that represent the deadly elements.

You can specify several characters in the rule value to indicate variants. In this example, three characters can represent the deadly elements : `/`, `\` and `|`.

### The author

My game is ready, I just have to sign it!

```xml
<game
title="the ravine"
author="leon"
player="?"
goal="X"
deadly="\/|"
>
<level>




    ?                   X
------------    -------------

/||\\/|//|\\|||\\//|/\\|//|//
</level>
<level>




  ?                      X
--------            ---------

/||\\/|//|\\|||\\//|/\\|//|//
</level>
<screen>




          BRAVO !            



</screen>
</game>
```

With the `author` rule, I specify my name or nickname. This name will be displayed next to the title.

# 2- Using the editor

## **code** mode in detail

- Sometimes errors will pop up on a red background when you try to switch to **test** mode. This is because there is a problem in your code! Try for example to write `<gmae>` instead of `<game>` and click on **test**, you should see an error message.
- the **show invisibles** option at the bottom left allows you to display invisible characters such as spaces.
- The **save XML** button allows you to save the code in an xml file. It is important to save regularly to be sure not to lose your work!
- The **import XML** button allows you to import the code contained in an xml file

## Export the game

In **export** mode, clicking on the **export my game** button will download an html file. Unlike the xml file that can be saved in **code** mode, this file cannot be reopened in the editor to modify it. On the other hand, it contains all the information to run the game if you open it in a web browser! This is the best way to share your game once you have finished it.


# 3- Advanced concepts

## Victory and defeat conditions.

There can be several players and several objectives in a level.

When a player touches an goal, this goal disappears. The game is won if there are no more goals.

When a player touches a deadly element, this player disappears. The game is lost if there are no players left.

### Multiple goals or players

```xml
<game>
<level>

        ?
       ===    ?
  ?          ===
 ===

         @
</level>
<level>

@          @
      @
   @      ===   ?
===            ===


^^^^^^^^^^^^^^^^^^^
</level>
<screen>
BRAVO !
</screen>
</game>
```

The above example shows what happens when there are multiple players or multiple goals. Players can die, goals can be reached, in both cases, the level continues as long as there are some left.

### No goals or players

```xml
<game>
<level>
   @   
</level>
<level>
   ?   
</level>
</game>
```

The above example shows what happens if there are no goals or players.
- When there is no goal: the level is won automatically before you can even play. You go to the next level.
- when there is no player : the level is lost automatically before you can play. You start the level again and again.

### Victory and defeat condition rules

```xml
<game
win_on_first_goal="true"
lose_on_first_death="true"
>
<level>

        ?
       ===    ?
  ?          ===
 ===

         @
</level>
<level>

 @         @
      @
          ===   ?
===            ===
     ===

^^^^^^^^^^^^^^^^^^^
</level>
<screen>
BRAVO !
</screen>
</game>
```

The rules `win_on_first_goal` and `lose_on_first_death` allow you to change the victory conditions.

They can take the value of `"true"` or `"false"`.

- `win_on_first_goal`: if the value of this rule is `"true"`, the level will be won as soon as the first goal is reached.
- `lose_on_first_death`: if the value of this rule is `"true"`, the level will be lost as soon as the first player dies.

By default, the value of these rules is `"false"`.



## The size

### Flexible size


```xml
<game
title=""
>
<level>
@ ?
</level>
<level>



          @   ?               
</level>
<screen>
BRAVO !
</screen>
</game>
```

The size of a level depends on its definition.
- The height of a level is defined by the number of lines in the definition
- The width of a level is defined by the number of characters in the longest line in the definition

When calculating the width of the level, spaces are taken into account. It can be difficult to work with spaces, because they are by definition invisible. For this reason it may be useful to check the box *show invisibles*. This option allows you to display invisible characters and therefore to see spaces.

### Large sizes

```xml
<game>
<level>
*        .    *                .     '     *              *   '      .          '    *         '        .          *     '          .           *   
   '                   '                            '                         '                   *                           '
@                                                                                                                                                    ?
</level>
<level>

 @
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===  ?  
</level>
<screen>
BRAVO !
</screen>
</game>
```

When the level is very large (in width, height or both), the game limits the size of what it displays to 80 × 30 characters. This does not mean that anything beyond that limit is inaccessible. The *camera* will follow the player as he moves.

### Size rules


```xml
<game
title=""
max_width="5"
max_height="5"
>
<level>
####################
#  #              ?#
#                  #
#@      #          #
####################
</level>
<level>
#####
#   #
#?  #
##  #
#   #
#   #
#  ##
#   #
##  #
# @ #
#####
</level>
<screen>
BRAVO !
</screen>
</game>

```

The `max_width` and `max_height` rules are used to define the maximum size of the display. The value must be a positive integer.

The display adapts to the size of the level, but if the size of the level exceeds the maximum size, it is cropped and the player is followed with the camera.

- `max_width` : sets the maximum width of the display. (default: `"80"`)
- `max_height`: sets the maximum height of the display. (default: `"30"`)

## Level specific rules

So far we have assigned all rules to the whole game by writing them between `<game` and `>`. It is also possible to assign rules to levels or screens by writing them between `<level` and `>` or between `<screen` and `>`


```xml
<game
title="The game title"
>
<level>
@                 ?
</level>
<level
title="eltit emag ehT"
>
?                 @
</level>
<level>
@                 ?
</level>
<screen>
       bravo       
</screen>
</game>
```

In this example the `title` rule is set twice, once for the entire game and once for level 2.

To find out the value of a rule, the game engine first checks if it is set in the level, if not we check if it is set in the game, otherwise we take its default value.

All rules can be defined locally (in a `<level>`), globally (in `<game>`), or not defined at all (default value).


## Les caractères plus en détail

We have already seen earlier the `player`, `goal` and `deadly`. There are two other types of characters, `solid` and `air`, which also have a rule. Finally, there are two rules (`default_char` and `default_type`) which do not define a character type but influence the way characters are handled by the game.


- `player`: (default value: `"@"`) sets the characters that represent the player.
- `goal`: (default value: `"?"`) sets the characters that represent the goal.
- `deadly`: (default: `"^"`) sets the character(s) that represent the deadly elements.
- `solid`: (default: `""`) sets the characters that represent solid elements.
- `air`: (default value: `" "`) sets the characters that represent air.
- `default_char`: (default value: `" "`) sets the character to place where there is no character.
- `default_type`: (default value: `"solid"`) sets the type of element to assign to a character that is not defined in any rule.

### choose special characters for air and solid elements

```xml
<game
air=":"
solid=" "
>
::::?::::::::
::::::::::?::
:::::::::::::
?::::  ::::::
:::::  ::::::
:@:::  ::::?:
</game>
```


In this example air is represented by `:` and solid elements are spaces!

Note that behind the player and goals, the game automatically places an air character.

### choose a different default type


```xml
<game>
<level
default_type="goal"
title="everything is the goal"
>

  for example ?  

      @
</level>
<level
default_type="player"
title="everything is the player"
>

  for example ?  

      @
</level>
<level
default_type="deadly"
title="everything is deadly"
>

  for example ?  

      @
</level>
<level
default_type="air"
title="everything is air"
>

  for example ?  

      @
</level>
<screen
title=""
>
bravo !
</screen>
</game>
```

Normally, a character that is not defined in any rule is considered `solid`. Here, we indicate that characters that are not defined should be considered a `goal`, a `player`, a `deadly` element, or `air`.

### choose a different default character

When the game starts a level, it fills in all empty cells with spaces. With the `default_char` rule, you can specify a different fill character.

```xml
<game
air=":"
solid=" "
default_char=":"
>
::::?
::::::::::?

?::::  
:::::  
:@:::  ::::?
</game>
```

This example is the same as above, but I didn't need to write the `:` at the end of the line and on the empty lines.

## Style

The `bg_color`, `bg2_color`, `fg_color` and `fg2_color` options allow you to change the colors of the game.

```xml
<game>
<screen
bg_color="#fff8e7"
bg2_color="#ffffd6"
fg_color="#3c45a2"
fg2_color="#383253"
>


    for example...    

                   -->
</screen>
<screen
bg_color="#eeffaa"
bg2_color="#ff3355"
fg_color="#55aa00"
fg2_color="#aa0055"
>


    for example...    

                   -->
</screen>
<screen
bg_color="#ffff00"
bg2_color="#ffff00"
fg_color="#0000ff"
fg2_color="#0000ff"
>


    for example...    


</screen>
</game>
```

- `bg_color` : allows you to choose the background color of the window.
- `bg2_color` : allows you to choose the background color of the game.
- `fg_color` : allows you to choose the color of the text.
- `fg2_color` : allows to choose the color of the outlines.

The value must be the Hexadecimal code of a color.

## Caractères spéciaux


Two characters are forbidden in the game description: `<` and `&`.

Three characters are forbidden in the rule values: `"`, `<` and `&`

If you break any of these restrictions, you will get an error. However, there are ways to get around them.

### Bypassing restrictions in the game description

To get around the restrictions in the game description you have to put the description in a CDATA section. A CDATA section starts with `<![CDATA[` and ends with `]]>`


```xml
<game>
<level><![CDATA[


   @        ?
  <<<<<<>>>>>>  

]]></level>
<screen>
  Bravo! 
</screen>
</game>
```

Without the CDATA section, this code would not have worked because of the forbidden character `<`

### Bypassing restrictions in rule values

To get around the restrictions in the value of a rule you have to use escaped versions of characters.

- `"` is escaped by writing `&quot;`
- `<` is escaped by writing `&lt;`
- `&` is escaped by writing `&amp;`

```xml
<game
player="&lt;"
>
<level><![CDATA[

 
 ?          <  
]]></level>
<screen>
  Bravo! 
</screen>
</game>
```

In order for the player to be represented by `<`, I have to escape the character in the rule (replacing `<` with `&lt;`) and I don't forget to put my description in a CDATA section.

## Physics

It is possible to modify the physics of the game. We will see rules which define the gravity, the strength of the player, and the jumps behaviour.


- `gravity` : (default value : 0.6) the gravity of the world in which the player evolves. With a gravity of `0`, the player will not fall back after a jump. If the gravity is greater than `jump_force`, the player will not be able to jump.
- `jump_force` : (default value: 1) the player's jump force. The higher it is, the higher the player jumps. Again, this value must be greater than the `gravity` value for the player to jump.
- `move_force` : (default value: 1) the player's moving force. The lower it is, the longer it will take the player to reach his maximum speed. With a value of 1, the maximum speed is reached directly. (n.b. The maximum speed cannot be changed)
- `braking` : (default value: 1) With a value of 1, the player stops moving as soon as the move button is released. With a value of 0, the player does not stop, as if he was on ice. Different values between 0 and 1 give the feeling of more or less slippery floor.
- `jump_time` : (default value: 0.2) how long (in seconds) the force of the jump is exerted if the jump key is held down. This allows you to jump higher or lower depending on how long you press the jump key.
- `coyote_time` : (default value: 0.2) how long (in seconds) the player can still jump after passing the threshold of a platform. This is to give the user the feeling that they have not missed a jump unfairly when moving on small platforms.
- `jump_buffer_time` : (default value: 0.2) how long before landing (in seconds) you can start pressing the jump key to jump again. This allows to chain jumps quickly without needing to be precise like a robot.

```xml
<game
gravity="0.6"
jump_force="1"
move_force="1"
braking="1"
coyote_time="0.2"
jump_buffer_time="0.2"
jump_time="0.2"
>





                     @


                =========================================

                                                                     
          ========                                                                        

                 ====================
                                                                                                      ?
==================                                         =============================================


</game>
```

This example contains all the default values for the different physics rules. Use this example by modifying the rules if you want to experiment with different values.

## Les commentaires

In order not to get lost in a big project it is possible to leave comments. A comment starts with `<!--` and ends with `-->`. What it contains is ignored by the game engine.

```xml
<!-- This is a comment -->
<game>
<!--
This is a comment
On multiple lines
-->
<level>
@        ?
</level>
<!-- One more comment -->
<screen>
Bravo !
</screen>
</game>
```

# 4- Resources

- To choose a color and know its hexadecimal code (`Hex Code`): [colorpicker.me](https://colorpicker.me)
- No need to limit yourself to the characters available on the keyboard, most of the characters listed on this page should be able to be used in a mote game : [wikipedia:List of Unicode characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters)
- A tool to draw with text. The text can then be easily copied into the mote editor: [asciiflow.com](https://asciiflow.com)
