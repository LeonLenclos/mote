# 0- Introduction

Ce tutoriel va vous guider pas à pas dans l'utilisation de Mote.

## C'est quoi Mote ?

Mote est un moteur de jeu en mode texte.

- Un moteur de jeu : un programme qui pertmet de créer des jeux.
- Le mode texte : un mode d'affichage ou on utilise des caractère plutôt que des pixels.

## L'éditeur

L'éditeur se trouve actuellement à cette adresse : https://leonlenclos.github.io/mote

L'éditeur dispose de trois modes qui sont accessibles en cliquant sur les boutons de la barre du haut :

- **code** : l'endroit où l'on code son jeu
- **test** : l'endroit où l'on teste son jeu
- **export** : l'endroit où l'on exporte son jeu

# 1- Prise en main

À partir de maintenant, chaque chapitre sera un example commenté.

Prenez le temps d'essayer les exemples sur l'éditeur :

1. Mettez vous en mode **code** et copiez le code de l'exemple.
2. Mettez vous en mode **test** et essayez le jeu.
3. Essayez de faire des modifications dans le code et alternez entre **code** et **test**.


### Mon premier jeu

```xml
<game>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</game>
```

Voici un example simple d'un jeu créé avec **Mote** : Le joueur incarne un `@` et il doit atteindre le `?` sans toucher les `^`. Pour jouer, on utilise les touches fléchées du clavier.

On remarque que le code commence et se termine par des balises `<game>` au début et `</game>` à la fin. Le code d'un jeu doit *toujours* être encadré de ces balises. Entre les deux balises, le jeu est simplement écrit tel qu'il apparaîtra en début de partie.

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
-------              --------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
</game>
```

Ce jeu comporte deux niveaux. Si l'on arrive à atteindre le `?` on passe au niveau suivant, si on touche un `^` on recommence le niveau dans le quel on est.

Un niveaux sont encadré par les balises `<level>` et `</level>`. Le code de notre jeu c'est donc un `<game> </game>` qui contient plusieurs `<level> </level>` qui contiennent chacun le texte qui décrit le niveau.

### Les écrans

C'est un peu étrange de voir le jeu se figer à la fin, et si on affichais plutôt un écran de félicitations à la fin.

```xml
<game>
<level>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<level>




  @                      ?
-------              --------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<screen>




          BRAVO !            



</screen>
</game>
```

La balise `<screen>` fonctionne comme la balise `<level>` la seule difference c'est que son contenu n'est pas jouable. Si le `<screen>` n'est pas placé à la fin du jeu comme sur cet exemple, on peut le passer en appuyant sur n'importe quelle touche.

### Un titre

C'est l'heure de donner un titre au jeu et de se débarasser enfin de ce *untitled*.

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
-------              --------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</level>
<screen>




          BRAVO !            



</screen>
</game>
```

Nous avons intégré une option au jeu. le nom de cette option est `title`, la valeur de l'option est `"le ravin"`.

Analysons cette nouvelle syntaxe en détail : L'option est renseignée à l'interieur de la balise ouvrante `<game>` plus précisément entre le `<game` et le `>`. Entre le nom et la valeur de l'option, il y a un signe `=`. On ne met pas de guillemets autour du nom de l'option mais on met des guillemets autour de la valeur.

### Les options de caractères

Marre du `@` du `?` et des `^`, changeons de caractères !

```xml
<game
title="le ravin"
player="?"
goal="X"
killer="\/|"
>
<level>




    ?                   X
------------    -------------

/||\\/|//|\\|||\\//|/\\|//|//
</level>
<level>




  ?                      X
-------              --------

/||\\/|//|\\|||\\//|/\\|//|//
</level>
<screen>




          BRAVO !            



</screen>
</game>
```

`title` n'est pas la seule option que l'on peut renseigner, il y en a en fait un paquet ! Ici nous nous interessons aux options de caractère qui servent à définir quel caractère représente chaque éllement du jeu :

- l'option `player` pour le ou les caractères qui représentent le joueur.
- l'option `goal` pour le ou les caractères qui représentent le but.
- l'option `killer` pour le ou les caractères qui représentent les élements mortels.

On peut indiquer plusieurs caractères dans la valeur de l'option pour indiquer des variantes. Dans cet exemple, trois caractères peuvent représenter les élements mortels (`killer`) : `/`, `\` et `|`.

# 2- Notions avancées

## Condition de victoire et de défaite.


Il peut y avoir plusieur joueurs et plusieur buts dans un niveau.
Lorsqu'un joueur touche un but, ce but disparaît. La partie est gagnée s'il n'y a plus aucun but.
Lorsqu'un joueur touche un ellement mortel, ce joueur disparaît. La partie est perdue s'il n'y a plus aucun joueur.

La partie est gagnée quand il n'y a plus aucun goal
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
   @             ?
           ========


^^^^^^^^^^^^^^^^^^^
</level>
<screen>
BRAVO !
</screen>
</game>
```




```xml
<game>
<level>
         QUE

   @         
</level>
<level>
        SE

       ?
</level>
<level>
   PASSE-T-IL

   @             ?
</level>
</game>
```



