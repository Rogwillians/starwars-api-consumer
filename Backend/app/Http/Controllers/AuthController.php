<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

Class AuthController extends Controller
{
    public function register(Request $req) {
        $data = $req->validate(['name'=>'required','email'=>'required|email','password'=>'required|confirmed']);
        $user = User::create(['name'=>$data['name'],'email'=>$data['email'],'password'=>bcrypt($data['password'])]);
        return response()->json($user, 201);
    }

    public function login(Request $req) {
        $req->validate(['email'=>'required|email','password'=>'required']);
        if (!Auth::attempt($req->only('email','password'))) {
            return response()->json(['message'=>'Credenciais inválidas'], 401);
        }
        $req->session()->regenerate();
        return response()->json(Auth::user());
    }

    public function logout(Request $req) {
        Auth::guard('web')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();
        return response()->json(['message'=>'Logout realizado']);
    }

    public function me(Request $req) {
        return response()->json($req->user());
    }
}

