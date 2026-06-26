<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register karo naya user
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'name.required'      => 'Name is Required',
            'email.required'     => 'Email is Required',
            'email.unique'       => 'Email already exist',
            'password.required'  => 'Password Required.',
            'password.min'       => 'Password Length minimum 8 charecters required.',
            'password.confirmed' => 'Password and confirm password didnt match.',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful!',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    /**
     * Login karo existing user
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ], [
            'email.required'    => 'Email zaroori hai.',
            'password.required' => 'Password zaroori hai.',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Email ya password galat hai.'],
            ]);
        }

        $user  = Auth::user();
        // Purane tokens delete karo (ek user, ek token)
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful!',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    /**
     * Logout karo current user
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful!',
        ]);
    }

    
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}
