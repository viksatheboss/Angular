using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using MvcTaskManager.Identity;
using MvcTaskManager.ServiceContracts;
using MvcTaskManager.ViewModels;

namespace MvcTaskManager.Controllers
{
    public class AccountController : Controller
    {
        private IUsersService _usersService;
        private IAntiforgery _antiforgery;
        private ApplicationSignInManager _applicationSignInManager;

        public AccountController(IUsersService usersService, IAntiforgery antiforgery, ApplicationSignInManager applicationSignInManager)
        {
            this._usersService = usersService;
            this._antiforgery = antiforgery;
            this._applicationSignInManager = applicationSignInManager;
        }

        [HttpPost]
        [Route("authenticate")]
        public async Task <IActionResult> Authenticate([FromBody]LoginViewModel loginViewModel)
        {
            var user = await _usersService.Authenticate(loginViewModel);
            if (user == null)
                return BadRequest(new { message = "Username or password is not correct" });

            HttpContext.User = await _applicationSignInManager.CreateUserPrincipalAsync(user);
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            Response.Headers.Add("XSRF-REQUEST-TOKEN", tokens.RequestToken);
            Response.Headers.Add("Access-Control-Expose-Headers", "XSRF-REQUEST-TOKEN");

            return Ok(user);
        }
    }
}