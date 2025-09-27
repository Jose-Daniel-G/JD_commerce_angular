import { PostModalComponent } from '../post-modal/post-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post, Category } from '../post.interface';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-index',
  standalone: true,
  imports: [CommonModule, RouterModule, PostModalComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild('postModalComponent') postModalComponent!: PostModalComponent;
  categories: Category[] = [];
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.posts;
        this.categories = data.categories;
      console.log('data post:', data);

      },
      error: (err) => console.error(err)
    });
  }
  crearPost() {
    this.postModalComponent.postData = null; // No hay datos → crear
    this.postModalComponent.openModal('create');
  }
  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas eliminar esta publicación?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePost(id);
      }
    });
  }

  deletePost(id: number): void {
    this.postsService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== id);
        Swal.fire('Eliminado!', 'La publicación ha sido eliminada.', 'success');
      },
      error: (err) => console.error(err)
    });
  }
}
