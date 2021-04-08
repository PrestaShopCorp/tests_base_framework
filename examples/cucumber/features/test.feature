Feature: Random
  First visit page
Scenario: Go to first visit page on addons
  Given I go to url addons url
  Then I am on addons home page
  When I go to first visit page
  Then I am on first visit page