(function(storage, doc, my_games){
    'use strict';

    let requesting  = false;
    let searchTimer;

    let state = {
        'order': 'a', // a => alphabetical, n => newest, m => most played
        'query': '',
        'genre': 'any',
        'platform': 'any'
    }

    let selected = my_games;

    
    let controller;
    let signal;
    function initController()
    {
        // Create an instance.
        controller = 'AbortController' in window ? (new AbortController()) : {
            signal: {},
            abort: function(){}
        };
        signal = controller.signal
    }

    initController();

    function search() {
console.log(signal, requesting);

        if (requesting || signal.aborted)
        {
            controller.abort();
            requesting = false;
            initController();
            return search();
        } // end if

        requesting = true;
        fetch('/my-games/search', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            signal: signal,
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(state)
        })
        .then(function(response){
            requesting = false;
            return response.json();
        }).then(function(data){
            render(data.data);
        }).catch(function(e){
            requesting = false; 
        });
    }

    let toggle = function(e) {
        let id = e.target.getAttribute('data-id');
        if (selected.indexOf(id) !== -1)
        {
            selected = selected.filter(function(item) {
                return item !== id;
            });
        } else {
            selected.push(id);
        } // end if

        mark();
    }

    function render(items) {

        let container = doc.getElementById('container');
        let template = document.getElementById('game-template').innerHTML;

        // clear before fill
        container.innerHTML = '';

        items.map(function(item) {
            let d = doc.createElement('div');
            d.className = 'col-md-4 col-sm-6';
            d.innerHTML = template
            .replace('#name', item.full_name)
            .replace('#gamers', item.gamers)
            .replace('#devs', item.d_and_p)
            .replace('#img', item.ava);    
            
            let trigger = d.querySelector('input.orange-btn');
            trigger.setAttribute('data-id', item.id);
            trigger.onclick = toggle;
            container.appendChild(d);
        });
        
        mark();
    }

    function sort(e)
    {
        state.order = e.target.id.split('-').pop();
        clearInterval(searchTimer);
        searchTimer = setTimeout(search, 450);
    } // end if

    
    doc.getElementById("search-input").addEventListener("keyup", function(e) {
        
        if (event.isComposing || event.keyCode === 229) {
            return;
        } // end if

        state.query = e.target.value;
        clearInterval(searchTimer);
        searchTimer = setTimeout(search, 450);
    }, false);

    doc.getElementById("platform").addEventListener("change", function(e) {
        state.platform = e.target.value;
        clearInterval(searchTimer);
        searchTimer = setTimeout(search, 450);
    }, false);

    doc.getElementById("genres").addEventListener("change", function(e) {
        state.genre = e.target.value;
        clearInterval(searchTimer);
        searchTimer = setTimeout(search, 450);
    }, false);

    doc.getElementById("sort-a").addEventListener("click", sort, false);
    doc.getElementById("sort-n").addEventListener("click", sort, false);
    doc.getElementById("sort-m").addEventListener("click", sort, false);

    Array.prototype.slice.call(doc.querySelectorAll('input.orange-btn')).map(function(el){
        el.onclick = toggle;
    });

    function mark() {

        Array.prototype.slice.call(doc.querySelectorAll('input.orange-btn.active')).map(function(el){
            el.classList.remove('active');
        });

        selected.map(function(hash){
            let el = doc.querySelector('input[data-id="'+hash+'"]');
            
            if(el) {
                el.classList.add('active');
            } // end if
        });

        if (selected.length)
        {
            doc.getElementById("submit").removeAttribute("disabled");
        } else {
            doc.getElementById("submit").setAttribute("disabled", true);
        }// end if

        doc.getElementById("selected").value = JSON.stringify(selected);
    }

    mark();
})(localStorage, document, my_games);
