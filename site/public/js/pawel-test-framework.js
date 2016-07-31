// TEST FRAMEWORK
function Assert() {
};
Assert.assertEquals = function(expected, actual) {
  if (expected != actual) {
    var expectedJson = JSON.stringify(expected);
    var actualJson = JSON.stringify(actual);
    throw "Expected [" + expectedJson + "] but was [" + actualJson + "]"
  };
};

function TestSuiteResults() {
  this.failures = {};

  this.addFailure= function(testName, errorMessage) {
    this.failures[testName] = errorMessage;
  };

  this.present = function() {
    if (Object.keys(this.failures).length != 0) {
      $(".site-wrapper").css("background-color", "#880e0e");
      $(".site-wrapper").empty();

      var that = this;
      Object.keys(this.failures).forEach(function(testName) {
        var failure = "[FAILURE] " + testName + " : " + that.failures[testName];
        $(".site-wrapper").append("<h2>" + failure + "</h2>");
      });
    }
  };
};

function TestSuite() {
  this.tests = {};

  this.addTest = function(testTitle, testFunction) {
    this.tests[testTitle] = testFunction;
  };

  this.run = function() {
    var that = this;
    var testSuiteResults = new TestSuiteResults();
    Object.keys(this.tests).forEach(function(testName) {
      try {
        that.tests[testName](testSuiteResults);
      } catch (errorMessage) {
        testSuiteResults.addFailure(testName, errorMessage);
      };
    });

    testSuiteResults.present();
  }
};
