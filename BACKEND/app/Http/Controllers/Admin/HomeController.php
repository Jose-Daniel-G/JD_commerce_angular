<?php

namespace App\Http\Controllers\Admin;

use App\Models\Curso;
use App\Models\Profesor;
use App\Models\Agenda as CalendarAgenda;  // Usa un alias para el modelo Agenda
use App\Models\Horario;
use App\Models\Cliente;
use App\Models\Secretaria;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Config;
use App\Models\Post;
use App\Notifications\PostNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class HomeController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth')->except(['message_landing_page']); // Aplica el middleware 'auth' a todos los métodos excepto 'landing_page' 
        // $this->middleware('can:admin.show_reservas')->only('show');
    }

    public function index()
    {
        $posts = Post::with(['category', 'image'])->latest()->get(); 
        return view('home', compact('posts'));
        return response()->json(['posts' => $posts], 200);
    }
    public function message_landing_page(Request $request)
    {
        $valid = $request->validate([
            'title'   => 'required',
            'email'   => 'required|email',
            'phone'   => 'required',
            'message' => 'required',
        ]);
        Notification::route('mail', 'destino@tudominio.com')->notify(
            new PostNotification($request->title, $request->email, $request->phone, $request->message)
        );

        return back()->with('success', '✅ Tu mensaje fue enviado correctamente.');
    }
}
