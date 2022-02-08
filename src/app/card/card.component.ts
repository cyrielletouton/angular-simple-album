import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../types';

// La classe permet de décrire les attributs
// de l'objet `post` passé depuis le parent
// class Post {
//   title!: string;
//   description!: string;
//   picture!: string;
// }

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() post!: Post;
  likes = 0;

  addLike() {
    this.likes += 1;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
