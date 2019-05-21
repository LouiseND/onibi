//variable des sprites
var spr;//variable personnage joué
var end_level;
var platform1;
var platform2;
var badguy1;//ennemi numéro 1
//var projectile; //armes jetées par le personnage

function setup() {
  createCanvas(1500, 500);
  resetGame();
    
 //bouton qui lance la fonction resetGame
 var button = document.getElementById("button_reset");   
 button.addEventListener('click', resetGame); 
 //button.addEventListener('click', cadavres); 


}

//fonction qui va instaurer les paramètres de départ à chaque fois qu'elle est sollicitée
function resetGame(){

//createSprite permet d'assigner des propriétés spécifiques au personnage par la suite
  spr = createSprite(
      50, 50, 20, 20);//(abscisses, ordonnées, largeur, hauteur)
  spr.shapeColor = color(255);
    
 //les plateformes sur lesquelles le personnage se déplace
  platform1 = createSprite(
  100, 100, 200, 20);
  platform1.shapeColor = color(0);
  
  platform2 = createSprite(
  300,200,200,20);
  platform2.shapeColor = color(70);
    
  platform3 = createSprite(
  450,400,300,20);
  platform3.shapeColor = color(0);
    
  platform4 = createSprite(
  100,350,200,20);
  platform4.shapeColor = color(0);
         
  platform5 = createSprite(
  500,100,200,20);
  platform5.shapeColor = color(0);

  platform6= createSprite(
  600,250,20,280);
  platform6.shapeColor= color(37,14,3);

  platform7= createSprite(
  600,50,20,120);
  platform7.shapeColor= color(0);

  platform8=createSprite(
  1000,400,200,20);
  platform8.shapeColor= color(0);

  platform9=createSprite(
  900,80,200,20);
  platform9.shapeColor= color(0);

  platform10=createSprite(
  600,450,20,120);
  platform10.shapeColor=color(0); 
     
  end_level = createSprite(
  1000,70,20,40);
  end_level.shapeColor = color(0,255,0);
  
  badguy1 = createSprite(
  510,5,30,30);
  badguy1.shapeColor = color(70);
    
    /*Armes créées par spr*/
  projectile = createSprite(0,0,0,0);
    
  /*Objet permettant au personnage (var = spr) de lancer des projectiles (var =projectile)*/
  object1 = createSprite(
  100,300, 10,10);    
  object1.shapeColor= color(255,0,0);  
    
    /*ennemi (var = tourelle) immobile tirant des projectiles (var = tourelle_projectile )*/
  tourelle= createSprite(100,225,10,10);
  tourelle.shapeColor=color(0,255,255);
  tourelle_projectile = createSprite(100,225,7,7);
  tourelle_projectile.shapeColor= color(0,255,255);  
    
  // la jauge de vie doit être remplie au maximum, au départ
  let health = document.getElementById("health"); 
  health.value = 100;
    
  badguy1.setSpeed(1.5, 0);
}
   


function draw() {
  background(50);
  fill(255);
  noStroke();
  //vecteur associé au personnage qui le pousse vers le bas, simulation de gravité
  spr.addSpeed(0.15, 90);
  badguy1.addSpeed(0.15,90);
  tourelle_projectile.addSpeed(1,0);  
  //propriété empêchant le personnage et les plateformes de se croiser  
  spr.collide(platform1);
  spr.collide(platform3);
  spr.collide(platform4);
  spr.collide(platform5);
  spr.collide(platform6);
  spr.collide(platform7);
  spr.collide(platform8);
  spr.collide(platform9);
  spr.collide(platform10);  
  spr.collide(badguy1);
  badguy1.collide(platform5);
    
    /*Disparition du mur en bois : si le projectile lancé par spr heurte la platform concernée, alors la platforme disparait  : largeur = 0 et hauteur également. Le projectile disparait alors car consommé*/
  if (projectile.collide(platform6)==true) {
      platform6.width=0;
      platform6.height=0;

      projectile.width=0;
      projectile.height=0;

    }

  /*Dispration des projectiles ne touchant pas le bon mur : si le projectile heurte les platformes sauf la 6, le projectile disparait*/
  if (projectile.collide(platform1)==true || projectile.collide(platform3)==true ||projectile.collide(platform4)==true ||
   projectile.collide(platform5)==true || projectile.collide(platform7)==true || projectile.collide(platform8)==true || 
   projectile.collide(platform9)==true){

      projectile.width=0;
      projectile.height=0;
  }

  /*Le personnage prend le jerrican : si les dimensions du personnages passe par dessus celles de l'objet, celui-ci disparait*/
  if (spr.overlap(object1)) { 
      object1.width=0;
      object1.height=0;    
      }

  /*si le projectile de la tourelle touche le mur en bois (platform6), il disparait car arrêté par la plateforme et un autre est créé*/
  if (tourelle_projectile.overlap(platform6) && platform6.width==20){
      tourelle_projectile.width=0;
      tourelle_projectile.height=0;
      tourelle_projectile=createSprite(100,225,7,7);
      tourelle_projectile.shapeColor=color(0,255,255);
  }   
    
     
  let health = document.getElementById("health"); 
    
    //si le personnage touche un obstacle, sa jauge de vie baisse
  if (spr.overlap(platform2)) {
  health.value = health.value - 5;
      }
   
  if(spr.overlap(tourelle_projectile)){
   health.value = health.value - 2;     
  }  
  if (spr.overlap(badguy1)){
  health.value = health.value-7;    
  }
    
  if (spr.overlap(end_level)){
  
  document.getElementById('fin_niveau').innerHTML="NIVEAU 1 TERMINE";
  
  }  
    
  //si la jauge tombe à 0, le jeu recommence au début
  if (health.value == 0){
  resetGame();
  //cadavres() ;
  }
    
  if (badguy1.position.x>520){
     badguy1.setSpeed(1.5, 180);   
  }  
  if (badguy1.position.x<500){
      badguy1.setSpeed(1.5, 0);
  }
  drawSprites();
    
} 

//fonction de mouvement avec les touches, et méthode de mouvement avec vitesse en fonction des coordonnées
/*chaque touche du clavier possède une keycode. Si cette keycode est détectée, un vecteur est associée au personnage*/
function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    spr.setSpeed(1.5, 0);
  }
  else if (keyCode == DOWN_ARROW) {
    spr.setSpeed(1.5, 90);
  }
  else if (keyCode == LEFT_ARROW) {
    spr.setSpeed(1.5, 180);
  }
  else if (keyCode == UP_ARROW) {
    spr.setSpeed(4, 280);
  }
  else if (key == ' ') {
    spr.setSpeed(0, 0);
  
  }
    
    /* keycode = 96 --> touche "shift"*/
  else if (keyCode == 96){
    spr.setSpeed(4,240);
  }
  /* keycode = 32 --> touche "espace"*/
  else if (keyCode == 32) {
    spr.setSpeed(4,270); 
  }

  /* keycode = 66 --> touche "B". Si elle est pressée et que le jerrican (object 1) a disparu (sa largeur est forcément 0) alors projectile du spr (var = projectile) est créé au coordonnées du personnage avec son propre vecteur (là vers la gauche)*/
  else if (keyCode == 66 && object1.width == 0) {
    projectile = createSprite(spr.position.x, spr.position.y, 7, 7);
    projectile.setSpeed(8,180);
    projectile.shapeColor=color(255,165,0);


  /*Même chose que juste avant sauf que le projectile ira à droite*/
  } 
  
  else if (keyCode == 78 && object1.width == 0) { 
    projectile = createSprite(spr.position.x, spr.position.y, 7, 7);
    projectile.setSpeed(8,0);
    projectile.shapeColor=color(255,165,0);
  }  
    

    
}
 /*function cadavres(){
  spr.width=0;
  spr.height=0;
  badguy1.width=0;
  badguy1.height=0;
    
} */  	
    



