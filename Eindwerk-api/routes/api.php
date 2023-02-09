<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/users/{name}', function ($name) {
    
    if (!DB::table('users')->where('name', $name)->exists()) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
    // return DB::table('users')->where('name', $name)->first();
    // do the same but with plain sql
    return DB::select('select * from users where name = ?', [$name]);

});

Route::post('/users', function (Request $request) {
    $name = $request->input('name');
    $password = $request->input('password');
    $email = $request->input('email');

    if (DB::table('users')->where('name', $name)->exists()) {
        return response()->json([
            'message' => 'User already exists'
        ], 409);
    }

    DB::table('users')->insert([
        'name' => $name,
        'password' => Hash::make($password),
        'email' => $email
    ]);

    return response()->json([
        'message' => 'User created'
    ], 201);
});

Route::get('/favourite_leagues', function() {
    return DB::table('favourite_leagues')-> get();
});

Route::post('/favourite_leagues', function (Request $request) {
    $league_id = $request->input('league_id');
    $user_id = $request->input('user_id');

    if (DB::table('favourite_leagues')->where(['league_id' => $league_id, 'user_id' => $user_id])->exists()) {
        return response()->json([
            'message' => 'League already chosen'
        ], 409);
    }

    DB::table('favourite_leagues')->insert([
        'league_id' => $league_id,
        'user_id' => $user_id
    ]);

    return response()->json([
        'message' => 'league stored'
    ], 201);
});


Route::get('/favourite_leagues/{user_id}', function ($user_id) {
    $league_ids = DB::table('favourite_leagues')
    ->join('leagues', 'favourite_leagues.league_id', '=', 'leagues.league_id')
    ->select('leagues.league_name')
    ->where('favourite_leagues.user_id', $user_id)
    ->get();
    return response()->json([
        'league_names' => $league_ids    
    ], 200);
});


Route::get('/leagues', function() {
    return DB::table('leagues')-> get();
});