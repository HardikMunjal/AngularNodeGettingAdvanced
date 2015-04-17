
$('body').append('<div id="toTop" class="btn btn-info" style="float: right; margin-bottom: 10px ; margin-right: 10px;"  ><span class="glyphicon glyphicon-chevron-up"></span> Back to Top</div>');
$(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
});
$('#toTop').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});
$(function () {
    $(".dropdown").hover(
                                               function () {
                                                   $('.dropdown-menu', this).stop(true, true).fadeIn("fast");
                                                   $(this).toggleClass('open');
                                                   $('b', this).toggleClass("caret caret-up");
                                               },
                                               function () {
                                                   $('.dropdown-menu', this).stop(true, true).fadeOut("fast");
                                                   $(this).toggleClass('open');
                                                   $('b', this).toggleClass("caret caret-up");
                                               });
});


//Angular Js
angular.module('RatingTutorial', [])
              .controller('RatingCtrl', function ($scope) {
                  $scope.rating = 5;
                  $scope.rateFunction = function (rating) {
                      alert('Rating selected - ' + rating);
                  };
              })
              .directive('starRating',
                function () {
                    return {
                        restrict: 'A',
                        template: '<ul class="rating">'
                                 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
                                 + '\u2605'
                                 + '</li>'
                                 + '</ul>',
                        scope: {
                            ratingValue: '=',
                            max: '=',
                            onRatingSelected: '&'
                        },
                        link: function (scope, elem, attrs) {
                            var updateStars = function () {
                                scope.stars = [];
                                for (var i = 0; i < scope.max; i++) {
                                    scope.stars.push({
                                        filled: i < scope.ratingValue
                                    });
                                }
                            };

                            scope.toggle = function (index) {
                                scope.ratingValue = index + 1;
                                scope.onRatingSelected({
                                    rating: index + 1
                                });
                            };

                            scope.$watch('ratingValue',
                                function (oldVal, newVal) {
                                    if (newVal) {
                                        updateStars();
                                    }
                                }
                            );
                        }
                    };
                }
            );
            