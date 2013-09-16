define('search-results-view', ['jquery', 'underscore', 'backbone', 'dispatch', './search-model', './regs-router'], function($, _, Backbone, Dispatch, SearchModel, Router) {
    'use strict';

    var SearchResultsView = Backbone.View.extend({
        el: '#content-wrapper.search-results',

        events: {
            'click .search-nav a': 'paginate'
        },

        initialize: function() {
            Dispatch.trigger('searchResults:open');
            Router.navigate('search/' + this.options.url);

            this.query = this.options.query;
            this.version = this.options.version;
            this.page = this.options.page || 0;
        },

        paginate: function(e) {
            e.preventDefault();

            var page = $(e.target).hasClass('previous') ? this.page - 1 : this.page + 1,
                config = {
                    query: this.query,
                    version: this.version,
                    page: page
                };

            Dispatch.trigger('search:submitted', config, 'searchResults');
        },

        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this;
        }
    });

    return SearchResultsView;

});
