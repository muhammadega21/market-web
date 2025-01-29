<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->email)->first();

        $validator = Validator::make($request->all(), [
            'email' => 'required|email:rfc,dns',
            'password' => 'required|min:4',
        ], [
            'email.required' => 'Email Tidak Boleh Kosong',
            'email.email' => 'Email Yang Anda Masukkan Salah!',

            'password.required' => 'Password Tidak Boleh Kosong',
            'password.min' => 'Password Tidak Kurang Dari 4 Karakter',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'message' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!Auth::attempt($credentials)) {
            if (!$user || !Hash::check($request['password'], $user->password)) {
                return response()->json([
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'Email atau password salah!'
                ], Response::HTTP_UNAUTHORIZED);
            }
        }

        $token = $user->createToken('login_token')->plainTextToken;
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Berhasil Login',
            'access_token' => $token,
        ], Response::HTTP_OK);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Berhasil Logout'
        ], Response::HTTP_OK);
    }
}
