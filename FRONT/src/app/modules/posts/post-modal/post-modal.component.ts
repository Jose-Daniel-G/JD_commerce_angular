declare var $: any;
import { Component, ElementRef, ViewChild, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Post, Category } from '../post.interface';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('postModal') modalElement!: ElementRef;
  @Input() categories: Category[] = [];
  @Input() postData: Post | null = null;

  postForm!: FormGroup;
  private modalInstance!: Modal;
  modo: 'create' | 'edit' = 'create';
  imgPreview: string = 'assets/images/portada_noticia.png';

  constructor(private fb: FormBuilder, private postsService:PostsService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      foto: [null],
      title: ['', Validators.required],
      body: ['', Validators.required],
      category: [null, Validators.required]

    });
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalElement.nativeElement);

  }

  ngOnChanges(changes: SimpleChanges) {
    // Cuando categories o postData cambien, podemos hacer ajustes 
    if (changes['postData'] && this.postData) {
      this.setFormData(this.postData);
    }
  }

  openModal(modo: 'create' | 'edit', post?: Post) {
    this.modo = modo;

    if (modo === 'edit' && post) {
      this.postData = post;
      this.setFormData(post);
    } else {
      this.postData = null;
      this.postForm.reset();
      this.imgPreview = 'assets/images/portada_noticia.png';
    }

    this.modalInstance.show();
  }

  private setFormData(post: Post) {
    this.postForm.patchValue({
      title: post.title,
      body: post.body,
      category: post.category_id || ''
    });
    // Si tienes una URL de foto en post, actualizar preview
    // this.imgPreview = post.foto || 'assets/images/portada_noticia.png';
  }

  closeModal(): void {
    this.modalInstance.hide();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.postForm.patchValue({ foto: file });

      const reader = new FileReader();
      reader.onload = () => this.imgPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

submit(): void {
  if (this.postForm.invalid) {
    this.postForm.markAllAsTouched();
    return;
  }

  // Crear FormData
  const formData = new FormData();
  formData.append('title', this.postForm.get('title')!.value);
  formData.append('body', this.postForm.get('body')!.value);
  formData.append('category_id', this.postForm.get('category')!.value);

  const foto = this.postForm.get('foto')!.value;
  if (foto) {
    formData.append('foto', foto);
  }

  // Llamar al servicio
  this.postsService.createPost(formData).subscribe({
    next: (res: any) => { // puedes usar 'any' o crear una interfaz específica si quieres
      console.log('Post creado:', res);

      // Opcional: actualizar lista en el componente padre
      // Esto depende de cómo pases eventos o actualices la lista

      this.closeModal();
      this.postForm.reset();
      this.imgPreview = 'assets/images/portada_noticia.png';
    },
    error: (err) => {
      console.error('Error al crear post:', err);
    }
  });
}




  get f() {
    return this.postForm.controls;
  }
}
