import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  postForm: FormGroup  = this.formBuilder.group({
    title: '',
    description: '',
    picture: ''
});
  error: any;

constructor( private postService: PostService, private formBuilder: FormBuilder ) {}

onSubmit(): void {
//     const formValue = this.newPost.value;
//     this.postService.createPost(formValue['title'], formValue['description'], formValue['picture'])
//     console.warn('Submitted');
//     this.newPost.reset();
// }

const postData = this.postForm.value;
    // console.log et console.error sont juste temporaires
    // idéalement, on afficherait une notification de succès
    this.postService.createPost(postData)
    .subscribe({
      next: post => {
        console.log(`post created with id ${post.id}`);
      },
      error: error => {
        this.error = error;
        console.error('Could not create post', error);
    }})
  }
}
