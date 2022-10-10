let editorLocalization = {
    code:{
        en:'code',
        fr:'coder',
    },
    test:{
        en:'test',
        fr:'tester',
    },
    export:{
        en:'export',
        fr:'exporter',
    },
    showInv:{
        en:'show invisbles:',
        fr:'montrer les invisibles',
    },
    importXML:{
        en:'import XML',
        fr:'importer XML',
    },
    exportXML:{
        en:'save XML',
        fr:'sauver XML',
    },
    exportGame:{
        en:'export my game',
        fr:'exporter mon jeu',
    },
    help:{
        en:'help',
        fr:'aide',
    },
    default_value:{
        en:'Default value: ',
        fr:'Valeur par défaut : '
    },
    export_failed:{
        en:"Oops! The export failed (n.b. This service is not available if you use mote locally without a server).",
        fr:"Oups ! L’exportation a échoué (n.b. Ce service n'est pas disponnible si vous utilisez mote en local sans server.)"
    },
    sample_game:{
        en:`<game>

</game>`,
        fr:`<jeu>

</jeu>`,
    }

}


let hints = {
    step1:{
        en:"In 'Coding' mode, write the code of your game or load an example.",
        fr:"En mode 'Coder', écrivez le code de votre jeu ou chargez un exemple.",
    },
    step2:{
        en:"Switch to 'Test' mode to see how the game looks like.",
        fr:"Passez en mode 'Tester' pour voir à quoi ressemble le jeu.",
    },
    step3:{
        en:"Toggle between 'Code' and 'Test', make changes until you are happy. Save your progress regularly with the 'Save XML' button!",
        fr:"Basculez entre le mode 'Coder' et le mode 'Tester', apportez des modifications jusqu'à ce que vous soyez satisfait. Sauvegardez régulièrement vos progrès avec le bouton 'Sauver XML' !",
    },
    step4:{
        en:"When you are happy, switch to 'Export' mode to export your game in html format.",
        fr:"Lorsque vous êtes satisfait, passez en mode 'Exporter' pour exporter votre jeu au format html.",
    },
}

let editorDynamicDoc = [
    {
        title:{
            en:'Help',
            fr:'Aide'    
        },
        intro:{
            en:"This help contains a list of all the tags and rules you can use to create games with mote. If this is your first time, or if you want more details about a rule, you may want to take a look at the <a href='https://leonlenclos.github.io/mote/doc/tuto-en.html'>tutorial</a>!",
            fr:"Cette aide contient une liste de toutes les balises et règles que vous pouvez utiliser pour créer des jeux avec mote. Si c'est votre première fois, ou si vous voulez plus de détails sur une règle, vous voudrez peut-être jeter un coup d’œil au <a href='https://leonlenclos.github.io/mote/doc/tuto-fr.html'>tutoriel</a> !"    
        },
    },
    {
        title:{
            en:'Game tag',
            fr:'Balise de jeu'    
        },
        content:{type:'tag', list:['game']}
    },
    {
        title:{
            en:'Scene tags',
            fr:'Balises de scène'    
        },
        intro:{
            en:'A game is composed of scenes, there are two types of scenes.',
            fr:'Un jeu est composé de scènes, il existe deux types de scènes.'    
        },
        content:{type:'tag', list:['level', 'screen']}
    },
    {
        title:{
            en:'Informative rules',
            fr:'Règles informatives'
        },
        intro:{
            en:'Give information about the game.',
            fr:"Donnent des informations sur le jeux."    
        },
        content:{type:'rule', list:['title', 'author']}
    },
    {
        title:{
            en:'Character rules',
            fr:'Règles de caractère'
        },
        intro:{
            en:'Allows you to change the meaning of the characters used in the game.',
            fr:"Ces règles permettent de modifier la signification des caractères utilisés dans le jeu."    
        },
        content:{type:'rule', list:['player', 'goal', 'deadly', 'solid', 'air', 'default_char', 'default_type']}
    },
    {
        title:{
            en:'Color rules',
            fr:'Règles de couleur'
        },
        intro:{
            en:"Allows you to change the colors of the game. The values must be hex color codes. There are hundreds of tools online to generate hex colors (for example: <a href='https://htmlcolorcodes.com/'>htmlcolorcodes.com</a>).",
            fr:"Permet de modifier les couleurs du jeu. Les valeurs doivent être des codes de couleur hexadécimaux. Il existe des centaines d'outils en ligne pour générer des couleurs hexadécimales (par exemple : <a href='https://htmlcolorcodes.com/'>htmlcolorcodes.com</a>)."    
        },
        content:{type:'rule', list:['fg_color', 'bg_color', 'fg2_color', 'bg2_color']}
    },
    {
        title:{
            en:'Size rules',
            fr:'Règles de taille'
        },
        intro:{
            en:'Allow to set the maximum size of the game. If the scene is smaller, the display adapts. If the scene is bigger, the display size is cropped and the player is followed with the camera.',
            fr:"Permettent de définir la taille maximale du jeu. Si la scène est plus petite, l'affichage s'adapte. Si la scène est plus grande, la taille de l'affichage est restreinte et le joueur est suivi par la caméra."    
        },
        content:{type:'rule', list:['max_width', 'max_height']}
    },
    {
        title:{
            en:'Victory/defeat condition rules',
            fr:'Règles des conditions de victoire/défaite'
        },
        intro:{
            en:'Allows you to modify the victory and defeat conditions.',
            fr:"Permettent de modifier les conditions de victoire et de défaite."    
        },
        content:{type:'rule', list:['win_on_first_goal', 'lose_on_first_death']}
    },
    {
        title:{
            en:'Physics rules',
            fr:'Règles de physique'
        },
        intro:{
            en:'Allows you to modify gravity, player force, and jump behavior.',
            fr:"Permettent de modifier la gravité, la force du joueur, et la gestion des sauts."    
        },
        content:{type:'rule', list:['gravity', 'jump_force', 'move_force', 'braking', 'jump_time', 'coyote_time', 'jump_buffer_time']}
    },
    {
        title:{
            en:'About mote',
            fr:'À propos'    
        },
        intro:{
            en:"mote is developed by <a href='https://leonlenclos.net'>Léon</a>, don't hesitate to <a href='https://leonlenclos.net/contact'>contact me</a> for anything. mote is free software (CC0) and its <a href='https://github.com/LeonLenclos/mote/'>source code</a> is open.",
            fr:"mote est développé par <a href='https://leonlenclos.net'>Léon</a>, n'hésitez pas à <a href='https://leonlenclos.net/contact'>me contacter</a> pour quoi que ce soit. mote est un logiciel libre (CC0) et son <a href='https://github.com/LeonLenclos/mote/'>code source</a> est ouvert."    
        },
    },

]


let examples = {
    minimal:{
        name:{en:'minimal', fr:'minimal'},
        code:{
            en:`<game>

</game>`,
            fr:`<jeu>

</jeu>`,
        }
    },

    very_basic:{
        name:{en:'Very basic example', fr:'Exemple super basique'},
        code:{
en:`<!--
Here is an example of a super basic game.

Click on 'test' to test this game, use the arrow keys to move
-->

<game>



@ ?
====== ======

^^^^^^^^^^^^^^^^^
</play>

<!--
A game always starts with <game> and always ends with </game>.
In between we have the definition of the game.

The @ represents the player
The ? represents the objective
The ^ represents the deadly elements
All other characters are solid elements

(n.b. Lines 1-5 and 17-27 are comments. mote ignores them when creating the game.
-->`,
fr:`<!--
Voici un exemple d'un jeu super basique.

Cliquez sur 'tester' pour tester ce jeu, utilisez les touches fléchées du clavier pour vous déplacer.
-->

<jeu>



@ ?
====== ======

^^^^^^^^^^^^^^^^^
</jeu>

<!--
Un jeu commence toujours par <jeu> et se termine toujours par </jeu>.
Entre les deux, c'est la définition du jeu.

Le @ représente le joueur
Le ? représente l'objectif
Le ^ représente les éléments mortels
Tous les autres caractères sont des éléments solides

(n.b. Les lignes 1-5 et 17-27 sont des commentaires. mote les ignore lors de la création du jeu.
-->
`,
        }
    },
    very_basic:{
        name:{en:'Very basic example', fr:'Exemple super basique'},
        code:{
en:`<!--
Here is an example of a super basic game.

Click on 'test' to test this game, use the arrow keys to move
-->

<game>



@ ?
====== ======

^^^^^^^^^^^^^^^^^
</play>

<!--
A game always starts with <game> and always ends with </game>.
In between we have the definition of the game.

The @ represents the player
The ? represents the objective
The ^ represents the deadly elements
All other characters are solid elements

(n.b. Lines 1-5 and 17-27 are comments. mote ignores them when creating the game.
-->`,
fr:`<!--
Voici un exemple d'un jeu super basique.

Cliquez sur 'tester' pour tester ce jeu, utilisez les touches fléchées du clavier pour vous déplacer.
-->

<jeu>



@ ?
====== ======

^^^^^^^^^^^^^^^^^
</jeu>

<!--
Un jeu commence toujours par <jeu> et se termine toujours par </jeu>.
Entre les deux, c'est la définition du jeu.

Le @ représente le joueur
Le ? représente l'objectif
Le ^ représente les éléments mortels
Tous les autres caractères sont des éléments solides

(n.b. Les lignes 1-5 et 17-27 sont des commentaires. mote les ignore lors de la création du jeu.
-->
`,
        }
    },
}

/*
Voici des exemples basiques 

<jeu></jeu>
Le jeu le plus basique possible
<jeu>

@       ?
===   ===
^^^^^^^^^
</jeu>
Un jeu avec sa définition
<jeu>
<niveau>

@       ?
===   ===
^^^^^^^^^
</niveau>
<ecran>
bravo !
</ecran>
</jeu>
Un jeu avec deux scènes
*/