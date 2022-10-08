### Table des matières

- [0- Introduction](#0--introduction)
- [1- Prise en main](#1--prise-en-main)
- [2- Utiliser l'éditeur](#2--utiliser-léditeur)
- [3- Notions avancées](#3--notions-avancées)
- [4- Ressources](#4--ressources)

# 0- Introduction

Ce tutoriel va vous guider pas à pas dans l'utilisation de mote.

## C'est quoi mote ?

mote est un [moteur de jeu](https://fr.wikipedia.org/wiki/Moteur_de_jeu) en [mode texte](http://polyducks.co.uk/what-is-textmode/).

Pour créer un jeu avec mote, on écrit le code du jeu dans un langage spécial que nous allons décrire ici. Ce langage est basé sur [XML](https://developer.mozilla.org/fr/docs/Web/XML/XML_introduction). 

## L'éditeur

L'éditeur se trouve actuellement à cette adresse : [leonlenclos.github.io/mote](https://leonlenclos.github.io/mote)

L'éditeur dispose de trois modes qui sont accessibles en cliquant sur les boutons de la barre du haut :

- **code** : l'endroit où l'on code son jeu
- **test** : l'endroit où l'on teste son jeu
- **export** : l'endroit où l'on exporte son jeu

# 1- Prise en main

À partir de maintenant, chaque chapitre sera un exemple commenté.

Prenez le temps d'essayer les exemples sur [l'éditeur](https://leonlenclos.github.io/mote) :

1. Dans le tutoriel, Copier le code de l'exemple en appuyant sur le bouton *copier* qui se trouve au-dessus de chaque exemple (<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>)
1. Dans l'éditeur, Mettez-vous en mode **code** et collez le code de l'exemple.
2. Mettez-vous en mode **test** et essayez le jeu.
3. Essayez de faire des modifications dans le code et alternez entre **code** et **test**.


### Mon premier jeu

```xml
<game>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</game>
```

Voici un exemple simple d'un jeu créé avec **mote** : Le joueur incarne un `@` et il doit atteindre le `?` sans toucher les `^`. Pour jouer, on utilise les touches fléchées du clavier.

On remarque que le code commence et se termine par des balises : `<game>` au début et `</game>` à la fin. Le code d'un jeu doit *toujours* être encadré de ces balises. Entre les deux balises, c'est la **définition** du jeu : le jeu est simplement écrit tel qu'il apparaîtra en début de partie.

### Les niveaux

Mon jeu est un peu trop facile, ajoutons de la difficulté.

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

Ce jeu comporte deux niveaux. Si l'on arrive à atteindre le `?` on passe au niveau suivant, si on touche un `^` on recommence le niveau dans lequel on est.

Les niveaux sont encadrés par les balises `<level>` et `</level>`. Le code de notre jeu c'est donc un `<game> </game>` qui contient plusieurs `<level> </level>` qui contiennent chacun la définition du niveau.

### Les écrans

C'est un peu étrange de voir le jeu se figer à la fin, et si on affichait plutôt un écran de félicitations.

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

La balise `<screen>` fonctionne comme la balise `<level>` la seule différence c'est que son contenu n'est pas jouable. Ici, l'écran est le dernier élément du jeu, mais les écrans peuvent être placé n'importe quand dans le jeu, on peut alors les passer en appuyant sur n'importe quelle touche.

### Un titre

C'est l'heure de donner un titre au jeu et de se débarrasser enfin de ce *untitled*.

```xml
<game
title="le ravin"
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

Nous venons de découvrir un nouveau concept de mote, les **règles**.

Nous avons intégré une règle. Le nom de cette règle est `title`, la valeur de la règle est `"le ravin"`.

On peut indiquer un titre vide avec `title=""`, dans ce cas, aucun titre ne s'affichera.

Analysons cette nouvelle syntaxe en détail : La règle est renseignée à l'intérieur de la balise ouvrante `<game>` plus précisément entre le `<game` et le `>`. Entre le nom et la valeur de la règle, il y a un signe `=`. On ne met pas de guillemets autour du nom de la règle, mais on met des guillemets autour de la valeur.

### Les règles de caractères

Marre du `@` du `?` et des `^`, changeons de caractères !

```xml
<game
title="le ravin"
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

`title` n'est pas la seule règle que l'on peut renseigner, il y en a en fait un paquet ! Ici nous nous intéressons aux règles de caractère qui servent à définir quel caractère représente chaque élément du jeu :

- la règle `player` pour le ou les caractères qui représentent le joueur.
- la règle `goal` pour le ou les caractères qui représentent le but.
- la règle `deadly` pour le ou les caractères qui représentent les éléments mortels.

On peut indiquer plusieurs caractères dans la valeur de la règle pour indiquer des variantes. Dans cet exemple, trois caractères peuvent représenter les éléments mortels (`deadly`) : `/`, `\` et `|`.


### L'auteur

Mon jeu est prêt, il ne me reste plus qu'à le signer !

```xml
<game
title="le ravin"
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

Avec la règle `author`, j'indique mon nom ou mon pseudo. Ce nom s'affichera à droite du titre.


# 2- Utiliser l'éditeur

## Le Mode **code** en détail

- Parfois des erreurs apparaissent sur fond rouge lorsque l'on veut passer en mode **test** et que le jeu détecte des erreurs dans le code. Essayez par exemple d'écrire `<gema>` au lieu de `<game>` et de cliquer sur **test**, vous devriez voir apparaitre une erreur.
- l'option *Show invisble* en bas à gauche permet d'afficher les caractères invisibles par exemple les espaces.
- Le bouton **Save XML** permet d'enregistrer le code dans un fichier xml. Il est important de sauver régulièrement pour être sûr de ne pas perdre son travail !
- Le bouton **Import XML** permet d'importer le code contenu dans un fichier xml

## Exporter le jeu

En mode **export**, cliquer sur le bouton **export my game** enregistre un ficher html. Contrairement au fichier xml que l'on peut enregister en mode **code**, ce fichier ne peut pas être rouverts dans l'éditeur pour le modifier. Par contre, il contient toutes les informations pour exécuter le jeu si on l'ouvre dans un navigateur web ! C'est la meilleure manière de partager son jeu une fois qu'on l'a fini.



# 3- Notions avancées

## Condition de victoire et de défaite.

Il peut y avoir plusieurs joueurs et plusieurs buts dans un niveau.

Lorsqu'un joueur touche un but, ce but disparaît. La partie est gagnée s'il n'y a plus aucun but.

Lorsqu'un joueur touche un élément mortel, ce joueur disparaît. La partie est perdue s'il n'y a plus aucun joueur.

### Plusieurs buts ou joueurs

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

L'exemple ci-dessus montre ce qu'il se passe quand il y a plusieurs joueurs ou plusieurs buts. Des joueurs peuvent mourir ou des buts être atteint, dans les deux cas, le niveau continue tant qu'il en reste.

### Aucun but ou joueur


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

L'exemple ci-dessus montre ce qu'il se passe s'il n'y a aucun but ou aucun joueur.
- quand il n'y a aucun but : le niveau est gagné automatiquement avant même que l'on puisse jouer. On passe au niveau suivant.
- quand il n'y a aucun joueur : le niveau est perdu automatiquement avant même que l'on puisse jouer. On recommence le niveau encore et encore.

### Règles de condition de victoire et de défaire

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

Les règles `win_on_first_goal` et `lose_on_first_death` permettent de modifier les conditions de victoire.

Elles peuvent prendre la valeur de `"true"` (vrai) ou `"false"` (faux).

- `win_on_first_goal` : si la valeur de cette règle est `"true"`, le niveau sera gagné dès que le premier but sera atteint.
- `lose_on_first_death` : si la valeur de cette règle est `"true"`, le niveau sera perdu dès que le premier joueur mourra.

Par défaut, la valeur de ces règles est `"false"`


## La taille


### Taille variable

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

La taille d'un niveau dépend de sa définition.
- La hauteur d'un niveau est définie par le nombre de ligne dans la définition
- La largeur d'un niveau est définie par le nombre de caractère dans la plus longue ligne de la définition

Lors du calcul de la largeur du niveau, on prend en compte les espaces. Il peut être difficile de travailler avec les espaces, car ils sont par définition invisibles. Pour cette raison il peut être utile de cocher la case *Show invisibles*. Cette option permet d'afficher les caractères invisibles et donc notamment de voir les espaces.

### Grandes tailles

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

Lorsque le niveau est très grand (en largeur, en hauteur ou les deux), le jeu limite la taille de ce qu'il affiche à 80 × 30 caractères. Cela ne veut pas dire que ce qui est au-delà de cette limite est inaccessible. La *caméra* suivra le joueur quand il se déplacera.

### Règles de taille


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

Les règles `max_width` et `max_height` permettent de définir la taille maximum de l’affichage. La valeur doit être un nombre entier positif.

L'affichage s'adapte à la taille du niveau, mais si la taille du niveau dépasse la taille maximum, on restreint sa taille et on suit le joueur avec la caméra.

- `max_width` : définit la largeur maximum de l'affichage. (par défaut : `"80"`)
- `max_height` : définit la hauteur maximum de l'affichage. (par défaut : `"30"`)


## Des règles spécifiques aux niveaux

Pour l'instant nous avons attaché toutes les règles au jeu entier en les écrivant entre `<game` et `>`. Il est aussi possible d'attacher des règles aux niveaux ou aux écrans en les écrivant entre `<level` et `>` ou entre `<screen` et `>`

```xml
<game
title="Le titre du jeu"
>
<level>
@                 ?
</level>
<level
title="uej ud ertit eL"
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

Dans cet exemple la règle `title` est définie deux fois, une fois pour le jeu dans son ensemble et une fois pour le niveau 2.

Pour connaitre la valeur d'une règle, le moteur de jeu cherche d'abord si elle est définie dans le niveau, si ce n'est pas le cas on regarde si elle est définie dans le jeu, sinon on prend sa valeur par défaut.

Toutes les règles peuvent être définies localement (dans un `<level>`), globalement (dans `<game>`), ou ne pas être définie du tout (valeur par défaut).

## Les caractères plus en détail

On a déjà vu plus tôt les règles `player`, `goal` et `deadly` qui permettent de définir le ou les caractères représentant joueurs, buts et éléments mortels. Il existe deux autres type de caractère, `solid` et `air`, qui disposent eux aussi d'une règle. Enfin, il existe deux règles (`default_char` et `default_type`) qui ne définissent pas un type de caractère mais qui influencent la manière dont les caractères sont pris en charge par le jeu.


- `player` : (valeur par défaut : `"@"`) définit le ou les caractères qui représentent le joueur.
- `goal` :  (valeur par défaut : `"?"`) définit le ou les caractères qui représentent le but.
- `deadly` :  (valeur par défaut : `"^"`) définit le ou les caractères qui représentent les éléments mortels.
- `solid` :  (valeur par défaut : `""`) définit le ou les caractères qui représentent les éléments solides.
- `air` : (valeur par défaut : `" "`) définit le ou les caractères qui représentent l'air.
- `default_char` :  (valeur par défaut : `" "`) définit le caractère à placer aux endroits ou il n'y a pas de caractère.
- `default_type` :  (valeur par défaut : `"solid"`) définit le type d'élément à attribuer à un caractère qui n'est définit dans aucune règle.


### choisir des caractères spéciaux pour l'air et les éléments solides

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


Ici l'air est représenté par des `:` et les éléments solides sont des espaces !

Notez que derrière le joueur et les buts, le jeu place automatiquement un caractère d'air.

### choisir un different type par défaut

```xml
<game>
<level
default_type="goal"
title="tout est le but"
>

  par exemple ?  

      @
</level>
<level
default_type="player"
title="tout est le joueur"
>

  par exemple ?  

      @
</level>
<level
default_type="deadly"
title="tout est mortel"
>

  par exemple ?  

      @
</level>
<level
default_type="air"
title="tout est de l'air"
>

  par exemple ?  

      @
</level>
<screen
title=""
>
bravo !
</screen>
</game>
```

En temps normal, un caractère qui n'est défini dans aucune règle est considéré comme un élément solide (`solid`). Ici, on indique que les caractères qui ne sont pas défini doivent être considérés comme un but (`goal`), un joueur (`player`), un élément mortel (`deadly`), ou de l'air (`air`).

### choisir un différent caractère par défaut

Lorsque le jeu lance un niveau, il remplie toutes les cases vides avec des éspaces. Grace à la règle `default_char`, on peut définir un autre caractère de remplissage.

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

Cet exemple est le même qu'un peu plus haut, mais je n'ai pas eu besoin d'écrire les `:` en fin de ligne et sur les lignes vides.

## Le style

Les options `bg_color`, `bg2_color`, `fg_color` et `fg2_color` permettent de changer les couleurs du jeu.

```xml
<game>
<screen
bg_color="#fff8e7"
bg2_color="#ffffd6"
fg_color="#3c45a2"
fg2_color="#383253"
>


    Par exemple...    

                   -->
</screen>
<screen
bg_color="#eeffaa"
bg2_color="#ff3355"
fg_color="#55aa00"
fg2_color="#aa0055"
>


    Par exemple...    

                   -->
</screen>
<screen
bg_color="#ffff00"
bg2_color="#ffff00"
fg_color="#0000ff"
fg2_color="#0000ff"
>


    Par exemple...    


</screen>
</game>
```

- `bg_color` : permet de choisir la couleur de l'arrière plan de la fenêtre.
- `bg2_color` : permet de choisir la couleur de l'arrière plan du jeu.
- `fg_color` : permet de choisir la couleur du texte.
- `fg2_color` : permet de choisir la couleur des contours.

La valeur doit être le code Hexadécimal d'une couleur.

## Caractères spéciaux

Deux caractères sont interdits dans la description du jeu : `<` et `&`

Trois caractères sont interdits dans les valeurs des règles : `"`, `<` et `&`

Si vous transgressez une de ces interdictions, vous aurez une erreur. Il existe néanmoins des moyens de contourner ces interdictions.

### Contourner les interdictions dans la description du jeu

Pour contourner l'interdiction dans la description du jeu il faut placer la description dans une section CDATA. Une section CDATA commence par `<![CDATA[` et se termine par `]]>`

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
Sans la section CDATA, ce code n'aurait pas fonctionné à cause du caractère interdit `<`


### Contourner les interdictions dans les valeurs des règles

Pour contourner l'interdiction dans la valeur d'une règle il faut utiliser les versions échappées des caractères.

- `"` s'échappe en écrivant `&quot;`
- `<` s'échappe en écrivant `&lt;`
- `&` s'échappe en écrivant `&amp;`


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

Pour que le joueur soit représenté par `<`, je dois échapper le caractère dans la règle (en remplaçant `<` par `&lt;`) et je n'oublie pas de bien mettre ma description dans une section CDATA.

## La physique

Il est possible de modifier la physique du jeu nous allons voir des règles qui définissent la gravité, la force du joueur, et la gestion des sauts.


- `gravity` : (valeur par défaut : 0.6) la gravité du monde dans lequel le joueur évolue. Avec une gravité de `0`, le joueur ne retombera pas après avoir sauté. Si la gravité est plus grande que la force de saut (`jump_force`) du joueur, le joueur ne pourra pas sauter.
- `jump_force` : (valeur par défaut : 1) la force de saut du joueur. Plus elle est grande, plus le joueur saute haut. Encore une fois, cette valeur doit être supérieur à la valeur de `gravity` pour que le joueur puisse sauter.
- `move_force` : (valeur par défaut : 1) la force de déplacement du joueur. Plus elle est basse, plus le joueur mettra du temps à atteindre sa vitesse maximale. Avec une valeur de 1, la vitesse maximale est directement atteinte. (n.b. La vitesse maximale ne peut pas être modifiée)
- `braking` : (valeur par défaut : 1) le freinage. Avec une valeur de 1, le joueur arrête de se déplacer dès que l'on relâche la touche de déplacement. Avec une valeur de 0, le joueur ne s'arrête pas, comme s'il était sur de la glace. Différentes valeurs entre 0 et 1 donnent la sensation de sols plus ou moins glissant.
- `jump_time` : (valeur par défaut : 0.2) pendant combien de temps (en seconde) la force du saut s'exerce si on reste appuyé sur la touche du saut. Cela permet que l'on puisse sauter plus ou moins haut selon que l'on appuie plus ou moins longtemps sur la touche du saut.
- `coyote_time` : (valeur par défaut : 0.2) pendant combien de temps (en seconde) le joueur peut encore sauter après avoir dépassé le seuil d'une plateforme. Cela permet de donner la sensation à l'utilisateur de ne pas avoir raté un saut de manière injuste quand il se déplace sur des petites plateformes.
- `jump_buffer_time` : (valeur par défaut : 0.2) combien de temps avant d'attérir (en seconde) on peut commencer à appuyer sur la touche saut pour sauter à nouveau. Cela permet d'enchaîner les sauts rapidement sans avoir besoin d'être précis comme un robot.

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

Cet exemple contient toutes les valeurs par défaut des différentes règles de physique. Utilisez cet exemple en modifiant les règles si vous voulez expérimenter différentes valeurs.


## Les commentaires

Pour s'y retrouver dans un gros projet il est possible de laisser des commentaires. Un commentaire commence par `<!--` et se termine par `-->`. Ce qu'il contient est ignoré par le moteur de jeu.

```xml
<!-- Ceci est un commentaire -->
<game>
<!--
Ceci est un commentaire
Sur plusieurs lignes
-->
<level>
@        ?
</level>
<!-- Encore un commentaire -->
<screen>
Bravo !
</screen>
</game>
```

# 4- Ressources

- Pour choisir une couleur et connaître son code hexadécimal (`Hex Code`) : [colorpicker.me](https://colorpicker.me)
- Pas la peine de se limiter aux caractères disponibles sur le clavier, La plupart des caractères listés sur cette page devraient pouvoir être utilisé dans un jeu mote : [wikipedia:List of Unicode characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters)
- Un outil pour dessiner avec du texte. Le texte peut ensuite aisément être copié dans l'éditeur mote : [asciiflow.com](https://asciiflow.com)