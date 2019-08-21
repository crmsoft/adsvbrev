<?php 


namespace App\Http\Controllers;

class PageController extends Controller {

    /**
     * Show Privacy policy 
     * 
     * @return Response
     */
    public function privacyPolicy()
    {
        return view('pages.privacy-policy');
    }

    /**
     * Show Privacy policy 
     * 
     * @return Response
     */
    public function terms()
    {
        return view('pages.terms');
    }

    /**
     * Show about 
     * 
     * @return Response
     */
    public function about()
    {
        return view('pages.about');
    }
}