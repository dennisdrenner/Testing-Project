/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. */

            it('are defined', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });

            // Loop through allFeeds and make sure each has a URL defined
            it('Have a defined URL which is not empty', function() {
                for (i=0; i<allFeeds.length; i++) {
                    expect(allFeeds[i].url).toBeDefined();
                    expect(allFeeds[i].url).not.toBe('');
                }
            });

    });  //End RSS feeds suite 


  
    describe('The Menu', function() {        
        /* Test that menu is hidden by default and visibility of the menu
        changes when menu icon is clicked */
            it('Has menu hidden by default', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });

            it('Menu visibility changes on click', function() {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });

    }); //End 'The Menu' suite


    describe('Initial entries', function() {
 
         // Test ensures when the loadFeed
         // * function is called and completes its work, there is at least
         // * a single .entry element within the .feed container.
         

            beforeEach(function(done) {
        // Second argument in loadFeed is a callback that runs once
        // feed has been loaded. In this case, we use the Jasmine done function as the
        // callback
                loadFeed(1, done);  
            });

        //If there is no entry, the text contents of .entry-link are an empty string
            it('loadFeed results in at least one entry', function() {
                 expect($('.entry-link').text()).not.toBe('');
            });
    }); // End "Initial entries" suite 
  
      
    describe('New Feed Selection', function() {
         /* This test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes. */


            //Load feed 1, wait for async load to finish, then call done() with the callback
            beforeEach(function(done) {    
                loadFeed(1, done); 
            });

            //Store text content of feed one, load feed two, wait for the feed to load
            // then call done() with the callback
            beforeEach(function(done) {    
               oldFeed = $('.entry-link').text();            
               loadFeed(2, done); 
  
            });

            it('When new feed is loaded content changes', function() {
                 expect($('.entry-link').text()).not.toBe(oldFeed);     
            });
    }); // End "New Feed Selection"

}());
